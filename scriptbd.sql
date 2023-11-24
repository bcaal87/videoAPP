-- Database: dbvideoapp

-- DROP DATABASE IF EXISTS dbvideoapp;
-- USE POSTGRESQL

--DATABASE
CREATE DATABASE dbvideoapp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

--TABLES
-- TABLA 1: PLAYLISTS

-- Table: public.playlists

-- DROP TABLE IF EXISTS public.playlists;

CREATE TABLE IF NOT EXISTS public.playlists
(
    id integer NOT NULL DEFAULT nextval('playlists_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT playlists_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.playlists
    OWNER to postgres;

--TABLA 2 - VIDEOS
-- Table: public.videos

-- DROP TABLE IF EXISTS public.videos;

CREATE TABLE IF NOT EXISTS public.videos
(
    id integer NOT NULL DEFAULT nextval('videos_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    filename character varying(255) COLLATE pg_catalog."default" NOT NULL,
    playlist_id integer,
    CONSTRAINT videos_pkey PRIMARY KEY (id),
    CONSTRAINT videos_playlist_id_fkey FOREIGN KEY (playlist_id)
        REFERENCES public.playlists (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.videos
    OWNER to postgres;

    



