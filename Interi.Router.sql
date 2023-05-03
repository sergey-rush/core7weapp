CREATE TABLE orders (
id INTEGER PRIMARY KEY autoincrement,
agent_id INTEGER NOT NULL, 
	title TEXT NOT NULL,
	info TEXT NOT NULL,
	order_state INTEGER NOT NULL,
	created DATE DEFAULT (datetime('now','localtime'))
);

INSERT INTO orders
(agent_id, title, info, order_state, created)
VALUES(2, 'Защита водителя', 'Хищение', 1, datetime('now','localtime'));

select * from orders;

select * from orders order by id desc;

select * from agents;

INSERT INTO messages
(agent_id, order_id, title, info, created)
VALUES(2, '3ttkfYfgrc8', 'System', 'Process completed', datetime('now','localtime'));

select * from messages;

CREATE TABLE messages (
    id INTEGER PRIMARY KEY autoincrement,
    agent_id INTEGER NOT NULL,
    order_id TEXT NOT NULL,
	title TEXT NOT NULL,
	info TEXT NOT NULL,	
	created DATE DEFAULT (datetime('now','localtime'))
);

CREATE TABLE public.user_comments (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	comment_uid text NOT NULL,
	parent_uid text NULL,
	record_uid text NOT NULL,
	user_uid text NOT NULL,
	message text NOT NULL,
	reply_count int4 NOT NULL DEFAULT 0,
	like_count int4 NOT NULL DEFAULT 0,
	dislike_count int4 NOT NULL DEFAULT 0,
	comment_state int4 NOT NULL DEFAULT 0,
	edited timestamp NULL,
	created timestamp NOT NULL DEFAULT timezone('utc'::text, now()),
	channel_uid text NOT NULL,
	CONSTRAINT user_comments_pk PRIMARY KEY (id)
);


ГО	
НС	
Отпуск без проблем	
Выплата без справок	
Доп защита	
имущество	
Мед помощь	
Ущерб	
Хищение

Полное Каско		
Супер-КАСКО		
Защита водителя		
Защита водителя + Супер-КАСКО		
Усеченный КАСКО		
Защита от угона
