# Tour Trek - User Authentication & Listing Reservation System

A comprehensive web platform for browsing property listings, managing reservations, and user accounts. This project focuses on a robust user experience with high standards for data validation and security.

---

## 🚀 Features

### 🔐 Authentication
- **Secure Sign Up:** Support for international names (accents), complex email formats (aliases), and short names.
- **Login Security:** Masked passwords, SQL injection protection, and keyboard accessibility (Enter key support).
- **Validation:** Real-time feedback for empty fields, invalid email formats, and duplicate accounts.

### 🔍 Search & Discovery
- **Location Filtering:** Filter properties by country (e.g., Morocco).
- **Advanced Search:** Multi-criteria filtering including Country, Date Range, and Listing details.
- **Rules:** Enforces a maximum reservation limit of 40 days.

### 📅 Reservations & Favorites
- **Booking Engine:** Integrated calendar with past-date disabling.
- **Dynamic Pricing:** Automatic calculation of total cost (Price per night × Duration).
- **Favorites:** Persistent "Wishlist" functionality linked to user accounts using a heart-toggle system.

---

## 🧪 Test Case Suite

The following test cases have been documented and executed to ensure system stability.

### 1. Authentication Module
| Test Case | Description | Priority |
| :--- | :--- | :--- |
| **TC_REG_01** | Sign up with valid email/password | High |
| **TC_REG_02** | Sign up with special characters in email (`+`, `.`) | Medium |
| **TC_REG_03** | Sign up with accented names (e.g., José) | Medium |
| **TC_REG_04** | Prevent duplicate account registration | High |
| **TC_LOG_01** | Login with valid credentials via Enter key | Low |
| **TC_LOG_02** | Security: Verify password masking | Medium |
| **TC_LOG_03** | Security: SQL injection attempt prevention | High |

### 2. Functional & Filtering Module
| Test Case | Description | Priority |
| :--- | :--- | :--- |
| **TC_FIL_01** | Filter listings by Country only | High |
| **TC_FIL_02** | Filter by Country + Date + Details | Low |
| **TC_RES_01** | Successful booking while logged in | Medium |
| **TC_RES_02** | Verify total price calculation logic | Low |
| **TC_RES_03** | Prevent selecting past dates in calendar | High |

### 3. User Experience & UI
| Test Case | Description | Priority |
| :--- | :--- | :--- |
| **TC_FAV_01** | Add listing to favorites (Persistence check) | Medium |
| **TC_FAV_02** | Remove listing from favorites | Low |
| **TC_NAV_01** | Keyboard navigation (Tab/Focus) | Medium |

---

## 🛠️ Known Issues & Bug Reports
* **API Validation:** Login failure currently returns `401` instead of `404` for non-existent users.
* **UI Sync:** Some listing tags (e.g., "Beach") may experience delay in visibility upon initial page load.
* **Search:** Filtering without a country selection requires improved error messaging.

---

## 📂 Project Structure
* `/src` - Frontend/Backend logic
* `/tests` - Documentation and automated test scripts
* `table-testCase.xlsx` - Full manual test execution history
