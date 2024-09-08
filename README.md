TimeSafe Project: ReadMe
imp details -
WhitelistSchemaHookModule#WhitelistSchemaHook - 0xfBb930F0f6a3a9990EC002F619877e060C4cacdE
generated transaction hash ,schemaid and attestation hash and id
Overview
Welcome to TimeSafe, a platform built on decentralized protocols to allow users to create, secure, and share memories in the form of digital time capsules. These time capsules are locked with a future unlock date and can only be accessed by a chosen recipient at that time. Leveraging Sign Protocol and Lit Protocol, TimeSafe ensures that the data is securely encrypted and access is tightly controlled.

This repository contains the implementation of TimeSafe, covering the creation, encryption, and unlocking of capsules, as well as querying features and special privileges for owners. Below is a breakdown of how the core features work.

1. Capsule Data - Schema
TimeSafe's Capsule Data schema defines how data inside each time capsule is structured. Capsules can contain various forms of content such as text, images, videos, and voice messages, with metadata for the unlock date and recipient. Each capsule also stores a personalized message that adds emotional significance to the memory being shared.

Key Components:
Capsule Content: Includes photos, videos, voice notes, or any combination.
Unlock Date: The future date when the capsule can be accessed by the recipient.
Recipient: The address of the person who will unlock the capsule.
Personalized Message: An emotional note tied to the memory.
2. Whitelist Schema Hook (Unlock Mechanism)
The Whitelist Schema Hook manages the unlock process for the time capsules. Once a capsule is created and stored, the unlock mechanism prevents anyone, including the creator (whitelisted address), from accessing the capsule before the specified unlock date.

Features:
No Early Access: Even the creator cannot access the capsule before the unlock date.
Owner Privileges: The creator has special privileges, including the ability to revoke (delete) capsules if needed.
Unlocking: On the unlock date, the recipient gains access to the capsule's contents through the whitelist schema, using the chosen recipient's address.
3. Attestation ID Generation
An Attestation ID is generated for each capsule upon creation. This ID is sent to the chosen recipient so that they can later search or query for the capsule once the unlock date arrives.

Use Case:
The Attestation ID serves as a unique identifier for the capsule, allowing the recipient to search for and retrieve it via the Sign Protocol after it becomes unlocked.
The recipient can use this Attestation ID in the Explore Capsule page's search bar to locate and open the capsule.
4. Search & Query via Sign Protocol
Once the capsule is created, the recipient will use the Sign Protocol to search and query for their capsule. By entering the Attestation ID in the search bar on the Explore Capsule page, the recipient can explore the available capsules and retrieve their designated capsule after the unlock date has passed.

Lit Protocol Integration
Lit Protocol is utilized to securely encrypt and decrypt time capsule data, ensuring confidentiality throughout the storage and retrieval process.

1. Encryption:
Before a capsule is stored on the decentralized network, its contents are encrypted using the Lit Protocol, ensuring that only the recipient with the proper decryption keys can access it.

The capsule data is stored securely on Arweave, but remains encrypted.
Unauthorized access is prevented by using Lit Protocol's advanced encryption mechanisms.
2. Decryption:
When the unlock date arrives, the capsule data is decrypted using the recipient's credentials, combining Lit actions to perform the decryption.

Only the designated recipient has the ability to decrypt the capsule.
The Lit Protocol ensures the capsule remains secure and private until the moment of decryption.
How It Works - End-to-End Flow
Create Capsule:

The creator adds content, sets the unlock date, and assigns a recipient.
Capsule data is encrypted using Lit Protocol.
The encrypted capsule is stored on Arweave.
Unlock Mechanism (Whitelist Schema):

The creator has no access to the capsule once it's created.
The whitelist schema hook ensures that only the chosen recipient can unlock the capsule on the specified date.
The creator has the ability to revoke (delete) the capsule if needed.
Attestation ID Generation:

Upon creation, an Attestation ID is generated and sent to the recipient.
This ID allows the recipient to search and retrieve the capsule using the Sign Protocol.
Search & Decrypt:

On the unlock date, the recipient searches for the capsule using the Attestation ID in the Explore Capsule page's search bar.
The capsule is decrypted using Lit Protocol actions, granting the recipient access to the content.
Conclusion
TimeSafe is built on a robust foundation of decentralized technologies to ensure that your memories are securely stored and shared at the perfect time. The combination of Sign Protocol for access management and Lit Protocol for encryption ensures that capsules remain private and secure, only unlocking when they are meant to.

Feel free to explore the repository, contribute, or raise issues if you have any feedback or suggestions!
