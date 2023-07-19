create database exam;

\c exam;

create extension if not exists "uuid-ossp";

create table users(
    user_id uuid default uuid_generate_v4() PRIMARY KEY not null,
    username varchar(64) not null,
    password text not null,
    name varchar(255) not null,
    surname varchar(255) not null
);

create table channels(
    channel_id uuid default uuid_generate_v4() PRIMARY KEY not null,
    name varchar(255) not null,
    description text not null,
    subscription_price int,
    owner_id uuid not null,
    created_at timestamptz default CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);
 
create table members(
    member_id uuid default uuid_generate_v4() PRIMARY KEY not null,
    channel_id uuid,
    user_id uuid,
    balance int default 0,
    isActive boolean default false,
    added_at timestamptz default CURRENT_TIMESTAMP,
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

create table bankAccounts(
    account_id uuid default uuid_generate_v4() PRIMARY KEY not null,
    cardNumber bigint not null unique,
    user_id uuid,
    balance int default 0,
    created_at timestamptz default CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

create table transactions(
    transaction_id uuid default uuid_generate_v4() PRIMARY KEY not null,
    account_id uuid not null,
    transactionType varchar not null,
    amount int not null,
    FOREIGN KEY (account_id) REFERENCES bankAccounts(account_id) ON DELETE CASCADE
);

create table subscriptions(
    subscription_id uuid default uuid_generate_v4() PRIMARY KEY not null,
    user_id uuid,
    channel_id uuid,
    duration int not null,
    started_at timestamptz default CURRENT_TIMESTAMP,
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

--to find account_id by cardNumber

SELECT bankAccounts.account_id FROM bankAccounts WHERE cardNumber = $1