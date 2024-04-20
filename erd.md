# Entity relationship diagram

[Official documentation](https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram)


```mermaid
erDiagram
    User {
        Int id PK
        String firstName
        String lastName
        String email
        String password
    }

    Blog {
        Int id PK
        String title
		String body
		String description
		String state
		Int read_count
		Int reading_time
		String tags
		Date timestamp
		Int User FK

    }

    User ||--o{ Blog : creates
	Blog ||..|| User 
```
