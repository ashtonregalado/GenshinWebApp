SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actions (
    action_id integer NOT NULL,
    action_date date NOT NULL,
    amount integer NOT NULL,
    action_type character varying(50),
    char_id integer
);


--
-- Name: actions_action_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.actions_action_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: actions_action_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.actions_action_id_seq OWNED BY public.actions.action_id;


--
-- Name: char; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."char" (
    char_id integer NOT NULL,
    char_name character varying(100),
    region character varying(50),
    vision character varying(50),
    weapon character varying(50)
);


--
-- Name: char_char_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.char_char_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: char_char_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.char_char_id_seq OWNED BY public."char".char_id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: actions action_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actions ALTER COLUMN action_id SET DEFAULT nextval('public.actions_action_id_seq'::regclass);


--
-- Name: char char_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."char" ALTER COLUMN char_id SET DEFAULT nextval('public.char_char_id_seq'::regclass);


--
-- Name: actions actions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_pkey PRIMARY KEY (action_id);


--
-- Name: char char_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."char"
    ADD CONSTRAINT char_pkey PRIMARY KEY (char_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: actions actions_char_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_char_id_fkey FOREIGN KEY (char_id) REFERENCES public."char"(char_id);


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20241126091750');
