'use client';
import { useEffect, useState } from 'react';
import { KeyRound, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type User = { username: string; role: 'admin' | 'user' };
type Props = { gatewayBase: string; currentUser: User | null };

export function UserManagement({ gatewayBase, currentUser }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [userStatus, setUserStatus] = useState('');
  const [addUserOpen, setAddUserOpen] = useState(false);
  const request = async (path: string, init: RequestInit = {}) => {
    const response = await fetch(`${gatewayBase}${path}`, {
      ...init,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...init.headers },
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || 'Request failed.');
    return payload;
  };
  const loadUsers = () => {
    if (currentUser?.role !== 'admin') return;
    request('/api/users')
      .then((payload) => setUsers(payload.data))
      .catch((error) => setUserStatus(error.message));
  };
  useEffect(loadUsers, [currentUser?.role, gatewayBase]);
  const changePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setPasswordStatus('');
    try {
      await request('/api/auth/password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword('');
      setNewPassword('');
      setPasswordStatus('Password changed successfully.');
    } catch (error) {
      setPasswordStatus(
        error instanceof Error ? error.message : 'Unable to change password.',
      );
    }
  };
  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setUserStatus('');
    try {
      await request('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password, role }),
      });
      setUsername('');
      setPassword('');
      setRole('user');
      setAddUserOpen(false);
      setUserStatus('User created.');
      loadUsers();
    } catch (error) {
      setUserStatus(
        error instanceof Error ? error.message : 'Unable to create user.',
      );
    }
  };
  const resetPassword = async (user: User) => {
    const next = window.prompt(`Enter a new password for ${user.username}`);
    if (next === null) return;
    try {
      await request(`/api/users/${encodeURIComponent(user.username)}`, {
        method: 'PATCH',
        body: JSON.stringify({ password: next }),
      });
      setUserStatus(`Password changed for ${user.username}.`);
    } catch (error) {
      setUserStatus(
        error instanceof Error ? error.message : 'Unable to reset password.',
      );
    }
  };
  const toggleRole = async (user: User) => {
    try {
      await request(`/api/users/${encodeURIComponent(user.username)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          role: user.role === 'admin' ? 'user' : 'admin',
        }),
      });
      setUserStatus(`${user.username} role updated.`);
      loadUsers();
    } catch (error) {
      setUserStatus(
        error instanceof Error ? error.message : 'Unable to change role.',
      );
    }
  };
  const deleteUser = async (user: User) => {
    if (
      !window.confirm(
        `Delete ${user.username}? This will end all of that user's sessions.`,
      )
    )
      return;
    try {
      await request(`/api/users/${encodeURIComponent(user.username)}`, {
        method: 'DELETE',
      });
      setUserStatus(`${user.username} deleted.`);
      loadUsers();
    } catch (error) {
      setUserStatus(
        error instanceof Error ? error.message : 'Unable to delete user.',
      );
    }
  };
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
        Account · {currentUser?.username}
      </p>
      <form onSubmit={changePassword} className="mt-3 space-y-3">
        <label className="block text-[10px] text-[#9aa7b6]">
          Current password
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
            className="mt-1 h-8 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-[11px] text-white outline-none focus:border-[#55d68b]/60"
          />
        </label>
        <label className="block text-[10px] text-[#9aa7b6]">
          New password
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            className="mt-1 h-8 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-[11px] text-white outline-none focus:border-[#55d68b]/60"
          />
        </label>
        <Button
          type="submit"
          size="sm"
          className="w-full bg-[#1a252f] text-[#c7d2de] hover:bg-[#24323e]"
        >
          <KeyRound />
          Change my password
        </Button>
        {passwordStatus && (
          <p className="text-[10px] leading-relaxed text-[#8fa0b4]">
            {passwordStatus}
          </p>
        )}
      </form>
      {currentUser?.role === 'admin' && (
        <>
          <div className="my-5 h-px bg-white/[.08]" />
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#667386]">
            User management
          </p>
          <Button
            onClick={() => setAddUserOpen(true)}
            size="sm"
            className="mt-3 w-full bg-[#55d68b] text-[#07120c] hover:bg-[#6de09a]"
          >
            <UserPlus />
            Add user
          </Button>
          <div className="mt-4 space-y-1.5">
            {users.map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-2 rounded border border-white/[.07] bg-[#090d12] p-2"
              >
                <div className="min-w-0 flex-1">
                  <b className="block truncate text-[10px] text-[#c7d2de]">
                    {user.username}
                  </b>
                  <span className="text-[9px] capitalize text-[#617083]">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => resetPassword(user)}
                  title="Reset password"
                  className="grid size-6 place-items-center rounded text-[#718095] hover:bg-white/[.06] hover:text-white"
                >
                  <KeyRound className="size-3" />
                </button>
                <button
                  onClick={() => toggleRole(user)}
                  disabled={user.username === currentUser.username}
                  title="Change role"
                  className="rounded border border-white/10 px-1.5 py-1 text-[8px] uppercase text-[#718095] hover:text-white disabled:opacity-30"
                >
                  {user.role === 'admin' ? 'Make user' : 'Make admin'}
                </button>
                <button
                  onClick={() => deleteUser(user)}
                  disabled={user.username === currentUser.username}
                  title="Delete user"
                  className="grid size-6 place-items-center rounded text-[#ff8b87] hover:bg-[#ff6b66]/10 disabled:opacity-30"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ))}
          </div>
          {userStatus && (
            <p className="mt-3 text-[10px] leading-relaxed text-[#8fa0b4]">
              {userStatus}
            </p>
          )}
          {addUserOpen && (
            <div
              className="fixed inset-0 z-[80] grid place-items-center bg-black/65 p-4"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setAddUserOpen(false);
              }}
            >
              <form
                onSubmit={createUser}
                className="w-full max-w-sm rounded-xl border border-white/10 bg-[#111820] p-5 shadow-2xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white">Add user</h2>
                    <p className="mt-1 text-[10px] text-[#718095]">
                      Create local Relay Console credentials
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAddUserOpen(false)}
                    className="rounded px-2 py-1 text-[#718095] hover:bg-white/[.06] hover:text-white"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-5 space-y-3">
                  <label className="block text-[10px] text-[#9aa7b6]">
                    Username
                    <input
                      autoFocus
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      className="mt-1 h-9 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-xs text-white outline-none focus:border-[#55d68b]/60"
                    />
                  </label>
                  <label className="block text-[10px] text-[#9aa7b6]">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="mt-1 h-9 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-xs text-white outline-none focus:border-[#55d68b]/60"
                    />
                  </label>
                  <label className="block text-[10px] text-[#9aa7b6]">
                    Role
                    <select
                      value={role}
                      onChange={(event) =>
                        setRole(event.target.value as 'admin' | 'user')
                      }
                      className="mt-1 h-9 w-full rounded border border-white/10 bg-[#080d12] px-2.5 text-xs text-white outline-none"
                    >
                      <option value="user">User</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </label>
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAddUserOpen(false)}
                    className="text-[#8fa0b4]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#55d68b] text-[#07120c] hover:bg-[#6de09a]"
                  >
                    <UserPlus />
                    Create user
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
