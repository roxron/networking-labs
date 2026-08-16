# Foundations

## Learning path

1. Convert between binary, decimal, and hexadecimal.
2. Identify address, prefix length, network, usable range, and broadcast (IPv4).
3. Subnet with fixed length, then VLSM; summarize only contiguous, equally aligned prefixes.
4. Learn IPv6 address types, prefix notation, neighbor discovery, and SLAAC/DHCPv6.
5. Trace forwarding: ingress frame → destination lookup → route/adjacency → rewritten egress frame.

## Subnetting checklist

Given `<ADDRESS>/<PREFIX>`:

1. Convert the prefix to a mask.
2. Find the block size in the interesting octet: `256 - mask_octet`.
3. Round the address octet down to a block boundary for the network.
4. The next block minus one is the broadcast address.
5. For conventional IPv4 subnets, hosts fall between network+1 and broadcast−1. `/31` point-to-point links and `/32` host routes are exceptions.
6. Verify with a second method before configuring.

IPv6 has no broadcast address. Do not apply IPv4 “first/last unusable” rules to an IPv6 prefix. See [RFC 3021](https://www.rfc-editor.org/rfc/rfc3021), [RFC 4291](https://www.rfc-editor.org/rfc/rfc4291), and [RFC 8200](https://www.rfc-editor.org/rfc/rfc8200).

## Summarization rule

A valid summary covers powers-of-two blocks and begins on the corresponding boundary. Confirm both requirements:

- all intended component routes are contained;
- no unintended address space will be attracted, or a discard route/longer-prefix escape path safely handles it.

Verification: inspect the RIB/FIB, test the first and last intended addresses, test an unintended address inside any over-summary, and confirm longest-prefix behavior.
