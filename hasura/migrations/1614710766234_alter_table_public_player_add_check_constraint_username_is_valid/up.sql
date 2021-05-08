alter table "public"."player" add constraint "username_is_valid" check (username ~ '^[a-z0-9-](_(?!(\.|_))|\.(?!(_|\.))|[a-z0-9-]){0,40}[a-z0-9-]$');
