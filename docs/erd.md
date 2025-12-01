# Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    ORGANIZATION ||--|{ USER : has
    ORGANIZATION ||--|{ BRANCH : has
    ORGANIZATION ||--|{ CLIENT : manages
    ORGANIZATION ||--|{ DEPOSIT : tracks

    BRANCH ||--|{ USER : employs
    BRANCH ||--|{ CLIENT : serves

    USER ||--|{ ROLE : has
    USER ||--|{ DEPOSIT : collects
    
    CLIENT ||--|{ DEPOSIT : makes
    CLIENT ||--|{ ACCOUNT : owns

    DEPOSIT }|--|| PAYMENT_METHOD : uses

    ORGANIZATION {
        uuid id PK
        string name
        string subdomain
        string status
        json branding_config
        timestamp created_at
    }

    USER {
        uuid id PK
        uuid organization_id FK
        uuid branch_id FK
        string username
        string email
        string password_hash
        string role
        boolean is_active
    }

    CLIENT {
        uuid id PK
        uuid organization_id FK
        uuid branch_id FK
        string name
        string phone
        string email
        string account_number
        decimal balance
    }

    DEPOSIT {
        uuid id PK
        uuid organization_id FK
        uuid client_id FK
        uuid collector_id FK
        decimal amount
        timestamp transaction_date
        string status
        string reference_id
    }

    BRANCH {
        uuid id PK
        uuid organization_id FK
        string name
        string location
        string code
    }
```

## Key Entities

1.  **Organization**: The tenant (Bank, MFI).
2.  **User**: System users (Admins, Managers, Collectors).
3.  **Client**: The end-customer depositing money.
4.  **Deposit**: The core transaction record.
5.  **Branch**: Physical or logical division of an organization.
