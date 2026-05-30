# Security Specification: SGF Narela Firebase Rules

## 1. Data Invariants

### Collection: `bookings`
1. **Implicit Deletion**: Clients are FORBIDDEN from deleting booking documents (`allow delete: if false;`).
2. **Implicit Direct Selection**: Clients are FORBIDDEN from listing all bookings (`allow list: if false;`).
3. **Identifier Integrity**: Only ASCII alphanumeric and underscore characters are allowed as document IDs (`isValidId()`).
4. **Name Integrity**: `name` must be a non-empty string, length <= 100.
5. **Phone Validation**: `phone` must be a string of length 10 consisting only of digits (or prefixed with `+91`).
6. **Guests Limit**: `guests` must be an integer between 1 and 15.
7. **Date Structure**: `date` must be a valid date string.
8. **Time Structure**: `time` must be a non-empty string.
9. **Creation Timestamps**: `createdAt` must match server time (`request.time`).

### Collection: `testimonials`
1. **Unsigned Reviews**: Anonymous or guest users can read all testimonials (`allow read: if true;`).
2. **Review Insertion**: Guests can insert reviews (`allow create: if true;` with validation helper).
3. **No Modification**: Once submitted, testimonials cannot be updated or deleted by clients (`allow update, delete: if false;`).
4. **Rating Boundaries**: `rating` must be an integer between 1 and 5.
5. **Length Enforcements**: `text` must be between 20 and 1000 characters.
6. **Author Validation**: `name` must be between 1 and 100 characters.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following 12 payloads or requests are designed to compromise system rules and must be rejected (`PERMISSION_DENIED`):

### Payloads attempting to break `bookings`
1. **Booking Read Attempt**: Reading all bookings without auth/privilege.
2. **Booking Deletion**: Unauthorized delete of an existing booking document.
3. **Shadow Update Gate Jump**: Update of booking status or data (e.g. attempting to override `guests` to 100).
4. **Id Poisoning**: Injecting a 2MB binary string as a booking ID path parameter.
5. **Past Timestamp Spoof**: Attempting to create a booking with a client-supplied `createdAt` in the past.
6. **Guests Range Violation**: Booking with guest count = 99.
7. **Name Size Exhaustion**: Booking with name greater than 10,000 characters of junk space (Denial of Wallet).

### Payloads attempting to break `testimonials`
8. **Testimonial Modification**: Attempting to edit someone else's star rating to a different score.
9. **Testimonial Deletion**: Attempting to prune a negative testimonial from Firestore.
10. **Star rating Boundary Jump**: Submitting a rating of `10` stars or `-1` stars.
11. **Text Size Exhaustion**: Testimonial with review comment of 1.5MB of characters.
12. **Truncated Review Text**: Submitting a review of only 2 characters (violating the minimum size limit).
