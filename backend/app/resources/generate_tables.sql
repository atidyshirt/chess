drop table user;

create table user
(
    id         int auto_increment,
    first_name varchar(50)  null,
    last_name  varchar(50)  null,
    email      varchar(50)  null,
    auth_token varchar(100) null,
    password   varchar(100) null,
    chess_username varchar(50) null,
    constraint user_id_uindex
        unique (id)
);

alter table user
    add primary key (id);
