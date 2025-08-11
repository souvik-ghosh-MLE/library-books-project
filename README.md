# Database Migrations with Alembic

This project uses **Alembic** for managing database schema changes.  
Alembic tracks, applies, and rolls back changes to your database safely over time.

---

## 1️ Initial Setup

**Install Alembic**
```bash
pip install alembic
```
This creates 
```
migrations/
    env.py
    script.py.mako
alembic.ini
```

## 2 Configure Alembic
In migrations/env.py, import your models and set the target_metadata to your SQLModel's metadata:

```
from app.models.book import Book  # Import all your models
from sqlmodel import SQLModel

target_metadata = SQLModel.metadata
```
In alembic.ini, either set the database URL directly:

```
ini

sqlalchemy.url = postgresql+asyncpg://<user>:<password>@<host>/<db_name>
```

Or configure it dynamically in env.py:

```
from app.src.config import Config
config.set_main_option("sqlalchemy.url", Config.DATABASE_URL)
```

## 3 Creating a Migration

```
alembic revision --autogenerate -m "add isbn to books"
```

Alembic will generate a migration file in migrations/versions/.

Always review this file before applying.

## 4 Applying Migrations

```
alembic upgrade head
```

Apply up to a specific revision:

```
alembic upgrade <revision_id>
```

Rollback the last migration:

```
alembic downgrade -1
```

Rollback to a specific revision:

```
alembic downgrade <revision_id>
```

## 5 Checking Database Revision

```
alembic current
```

## 6 Viewing Migration History

```
alembic history --verbose
```
