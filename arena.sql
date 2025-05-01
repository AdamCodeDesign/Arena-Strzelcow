--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

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
-- Name: Club; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Club" (
    id integer NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "clubName" text NOT NULL
);


ALTER TABLE public."Club" OWNER TO postgres;

--
-- Name: Club_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Club_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Club_id_seq" OWNER TO postgres;

--
-- Name: Club_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Club_id_seq" OWNED BY public."Club".id;


--
-- Name: Compensator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Compensator" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    material text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Compensator" OWNER TO postgres;

--
-- Name: Compensator_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Compensator_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Compensator_id_seq" OWNER TO postgres;

--
-- Name: Compensator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Compensator_id_seq" OWNED BY public."Compensator".id;


--
-- Name: Competition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Competition" (
    id integer NOT NULL,
    name text NOT NULL,
    "eventId" integer,
    type text NOT NULL,
    "gunId" integer,
    distance integer NOT NULL,
    "position" text NOT NULL,
    scope integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text
);


ALTER TABLE public."Competition" OWNER TO postgres;

--
-- Name: CompetitionParticipants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompetitionParticipants" (
    id integer NOT NULL,
    "competitionId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."CompetitionParticipants" OWNER TO postgres;

--
-- Name: CompetitionParticipants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CompetitionParticipants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CompetitionParticipants_id_seq" OWNER TO postgres;

--
-- Name: CompetitionParticipants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CompetitionParticipants_id_seq" OWNED BY public."CompetitionParticipants".id;


--
-- Name: Competition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Competition_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Competition_id_seq" OWNER TO postgres;

--
-- Name: Competition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Competition_id_seq" OWNED BY public."Competition".id;


--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    name text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    location text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "clubId" integer
);


ALTER TABLE public."Event" OWNER TO postgres;

--
-- Name: EventParticipants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventParticipants" (
    id integer NOT NULL,
    "eventId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."EventParticipants" OWNER TO postgres;

--
-- Name: EventParticipants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EventParticipants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EventParticipants_id_seq" OWNER TO postgres;

--
-- Name: EventParticipants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EventParticipants_id_seq" OWNED BY public."EventParticipants".id;


--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_id_seq" OWNER TO postgres;

--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: Grip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Grip" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    material text,
    weight integer,
    "gunId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Grip" OWNER TO postgres;

--
-- Name: Grip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Grip_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Grip_id_seq" OWNER TO postgres;

--
-- Name: Grip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Grip_id_seq" OWNED BY public."Grip".id;


--
-- Name: Gun; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Gun" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    caliber text NOT NULL,
    manufacturer text NOT NULL,
    "silencerId" integer,
    "magazineId" integer,
    "compensatorId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Gun" OWNER TO postgres;

--
-- Name: Gun_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Gun_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Gun_id_seq" OWNER TO postgres;

--
-- Name: Gun_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Gun_id_seq" OWNED BY public."Gun".id;


--
-- Name: Magazine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Magazine" (
    id integer NOT NULL,
    name text NOT NULL,
    capacity integer NOT NULL,
    material text NOT NULL,
    weight integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Magazine" OWNER TO postgres;

--
-- Name: Magazine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Magazine_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Magazine_id_seq" OWNER TO postgres;

--
-- Name: Magazine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Magazine_id_seq" OWNED BY public."Magazine".id;


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Profile" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "avatarUrl" text,
    bio text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Profile" OWNER TO postgres;

--
-- Name: Profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Profile_id_seq" OWNER TO postgres;

--
-- Name: Profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Profile_id_seq" OWNED BY public."Profile".id;


--
-- Name: Result; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Result" (
    id integer NOT NULL,
    score double precision NOT NULL,
    "userId" integer NOT NULL,
    "gunId" integer NOT NULL,
    "competitionId" integer NOT NULL
);


ALTER TABLE public."Result" OWNER TO postgres;

--
-- Name: Result_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Result_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Result_id_seq" OWNER TO postgres;

--
-- Name: Result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Result_id_seq" OWNED BY public."Result".id;


--
-- Name: Scope; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Scope" (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    magnification double precision,
    "lensDiameter" double precision,
    length double precision,
    weight integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Scope" OWNER TO postgres;

--
-- Name: Scope_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Scope_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Scope_id_seq" OWNER TO postgres;

--
-- Name: Scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Scope_id_seq" OWNED BY public."Scope".id;


--
-- Name: Silencer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Silencer" (
    id integer NOT NULL,
    name text NOT NULL,
    length integer,
    weight integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Silencer" OWNER TO postgres;

--
-- Name: Silencer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Silencer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Silencer_id_seq" OWNER TO postgres;

--
-- Name: Silencer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Silencer_id_seq" OWNED BY public."Silencer".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "clubId" integer
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _CompetitionParticipants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CompetitionParticipants" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CompetitionParticipants" OWNER TO postgres;

--
-- Name: _EventParticipants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_EventParticipants" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_EventParticipants" OWNER TO postgres;

--
-- Name: _GunScopes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_GunScopes" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_GunScopes" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Club id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Club" ALTER COLUMN id SET DEFAULT nextval('public."Club_id_seq"'::regclass);


--
-- Name: Compensator id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Compensator" ALTER COLUMN id SET DEFAULT nextval('public."Compensator_id_seq"'::regclass);


--
-- Name: Competition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competition" ALTER COLUMN id SET DEFAULT nextval('public."Competition_id_seq"'::regclass);


--
-- Name: CompetitionParticipants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompetitionParticipants" ALTER COLUMN id SET DEFAULT nextval('public."CompetitionParticipants_id_seq"'::regclass);


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: EventParticipants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventParticipants" ALTER COLUMN id SET DEFAULT nextval('public."EventParticipants_id_seq"'::regclass);


--
-- Name: Grip id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Grip" ALTER COLUMN id SET DEFAULT nextval('public."Grip_id_seq"'::regclass);


--
-- Name: Gun id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gun" ALTER COLUMN id SET DEFAULT nextval('public."Gun_id_seq"'::regclass);


--
-- Name: Magazine id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Magazine" ALTER COLUMN id SET DEFAULT nextval('public."Magazine_id_seq"'::regclass);


--
-- Name: Profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile" ALTER COLUMN id SET DEFAULT nextval('public."Profile_id_seq"'::regclass);


--
-- Name: Result id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result" ALTER COLUMN id SET DEFAULT nextval('public."Result_id_seq"'::regclass);


--
-- Name: Scope id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scope" ALTER COLUMN id SET DEFAULT nextval('public."Scope_id_seq"'::regclass);


--
-- Name: Silencer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Silencer" ALTER COLUMN id SET DEFAULT nextval('public."Silencer_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Club; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Club" (id, description, "createdAt", "updatedAt", "clubName") FROM stdin;
1	Klub strzelecki z Wrocławia	2025-04-13 11:24:13.615	2025-04-13 11:24:13.615	Strzelcy Wrocław
2	Elitarny klub snajperski	2025-04-13 11:24:25.263	2025-04-13 11:24:25.263	Snajperzy Kraków
\.


--
-- Data for Name: Compensator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Compensator" (id, name, type, material, "createdAt", "updatedAt") FROM stdin;
1	JP Recoil Eliminator	górna redukcja	stal	2025-04-13 11:28:07.697	2025-04-13 11:28:07.697
2	LANTAC Dragon	boczna redukcja	aluminium	2025-04-13 11:28:21.742	2025-04-13 11:28:21.742
\.


--
-- Data for Name: Competition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Competition" (id, name, "eventId", type, "gunId", distance, "position", scope, "createdAt", description) FROM stdin;
1	Pistolet Dynamiczny	1	IPSC	\N	15	Stojąca	1	2025-04-13 11:34:02.572	Zawody dynamiczne z przeszkodami
2	Karabin Precyzyjny	2	PRS	\N	300	Leżąca	2	2025-04-13 11:34:15.796	Zawody na długim dystansie
\.


--
-- Data for Name: CompetitionParticipants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompetitionParticipants" (id, "competitionId", "userId", "createdAt") FROM stdin;
1	2	2	2025-04-14 14:48:53.629
3	2	1	2025-04-14 14:49:51.104
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event" (id, name, date, location, description, "createdAt", "updatedAt", "clubId") FROM stdin;
1	Zawody Letnie	2025-06-10 10:00:00	Wrocław	Otwarte zawody klubowe	2025-04-13 11:25:17.591	2025-04-13 11:25:17.591	\N
2	Turniej Zimowy	2025-12-05 10:00:00	Kraków	Zimowe strzelanie precyzyjne	2025-04-13 11:25:51.571	2025-04-13 11:25:51.571	\N
\.


--
-- Data for Name: EventParticipants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EventParticipants" (id, "eventId", "userId", "createdAt") FROM stdin;
3	2	2	2025-04-14 15:00:32.659
4	2	1	2025-04-14 15:00:37.682
\.


--
-- Data for Name: Grip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Grip" (id, name, type, material, weight, "gunId", "createdAt", "updatedAt") FROM stdin;
1	Magpul MOE	Pistoletowy	polimer	80	\N	2025-04-13 11:28:39.95	2025-04-13 11:28:39.95
2	Magpul MOE	Standardowy	Polimer	90	\N	2025-04-13 11:30:12.657	2025-04-13 11:30:12.657
3	Ergo Grip	Anatomiczny	Guma	100	\N	2025-04-13 11:30:27.038	2025-04-13 11:30:27.038
\.


--
-- Data for Name: Gun; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Gun" (id, name, type, caliber, manufacturer, "silencerId", "magazineId", "compensatorId", "createdAt", "updatedAt") FROM stdin;
1	Glock 17	Pistolet	9mm	Glock	\N	\N	\N	2025-04-13 11:26:22.657	2025-04-13 11:26:22.657
2	AK-47	Karabin	7.62mm	Kalashnikov Concern	\N	\N	\N	2025-04-13 11:26:30.21	2025-04-13 11:26:30.21
\.


--
-- Data for Name: Magazine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Magazine" (id, name, capacity, material, weight, "createdAt", "updatedAt") FROM stdin;
1	PMAG 30	30	Polimer	150	2025-04-13 11:30:43.645	2025-04-13 11:30:43.645
2	Steel Mag 20	20	Stal	180	2025-04-13 11:30:59.68	2025-04-13 11:30:59.68
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Profile" (id, "userId", "avatarUrl", bio, "createdAt", "updatedAt") FROM stdin;
1	7	/avatars/3fc090a5-9047-4a53-b00c-317617602e95-falloutBoy.png	amator	2025-04-18 09:50:12.189	2025-04-18 09:50:12.189
2	6	\N	profesional	2025-04-18 10:03:40.18	2025-04-18 10:03:40.18
3	1	/avatars/6275e6fa-f311-4446-a36d-6acd12fe92cb.png	profesional	2025-04-18 10:03:56.282	2025-04-18 10:03:56.282
\.


--
-- Data for Name: Result; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Result" (id, score, "userId", "gunId", "competitionId") FROM stdin;
1	7.5	1	1	1
2	9.3	2	2	2
\.


--
-- Data for Name: Scope; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Scope" (id, name, type, magnification, "lensDiameter", length, weight, "createdAt", "updatedAt") FROM stdin;
1	Vortex Strike Eagle	Teleskopowy	1	24	27	300	2025-04-13 11:26:44.296	2025-04-13 11:26:44.296
2	Holosun HS510C	Kolimatorowy	1	30	10	200	2025-04-13 11:27:07.266	2025-04-13 11:27:07.266
\.


--
-- Data for Name: Silencer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Silencer" (id, name, length, weight, "createdAt", "updatedAt") FROM stdin;
1	inny3	\N	\N	2025-04-13 11:16:50.512	2025-04-13 11:16:50.512
2	Surefire SOCOM	\N	\N	2025-04-13 11:27:29.51	2025-04-13 11:27:29.51
3	AAC Ti-RANT	\N	\N	2025-04-13 11:27:43.06	2025-04-13 11:27:43.06
4	silent kill	\N	\N	2025-05-01 11:27:19.671	2025-05-01 11:27:19.671
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, "passwordHash", "createdAt", "updatedAt", "clubId") FROM stdin;
1	jan_kowalski	jan@example.com	hashed1	2025-04-13 11:24:40.189	2025-04-13 11:24:40.189	\N
2	anna_nowak	anna@example.com	hashed2	2025-04-13 11:25:00.848	2025-04-13 11:25:00.848	\N
3	sharpshooter_01	shooter01@example.com	SecurePass123!	2025-04-14 15:02:36.417	2025-04-14 15:02:36.417	\N
4	sPedro	pedro@example.com	Secpedro123!	2025-04-14 15:03:03.235	2025-04-14 15:03:03.235	\N
5	oJimmy	ojimmy@example.com	pagyjimmy123!	2025-04-14 15:03:26.22	2025-04-14 15:03:26.22	\N
6	Darylo	darylo@example.com	kokodes123!	2025-04-14 15:03:51.365	2025-04-14 15:03:51.365	\N
7	Adam	cokinonero@example.com	jabadabadu!	2025-04-14 15:04:16.32	2025-04-14 15:04:16.32	\N
\.


--
-- Data for Name: _CompetitionParticipants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CompetitionParticipants" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _EventParticipants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_EventParticipants" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _GunScopes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_GunScopes" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
122a03ae-ba6c-47c2-808f-78fd5a15771a	bdc62a34f2a38a8a903ef9a995d39f405d1795e3d6252e2b99ac606bde1811f9	2025-04-13 11:16:23.752578+00	20250406142143_init	\N	\N	2025-04-13 11:16:23.721072+00	1
260753f8-fb1c-4586-9a12-c47598a81179	5b3f760f608580da61806bec4f0069d0ac214062793f9399e46cc948381dcdb4	2025-04-13 11:16:23.761419+00	20250407094241_add_club	\N	\N	2025-04-13 11:16:23.7544+00	1
19995b8e-f899-4032-8e2c-341daa4e646c	cd6473585ff0e1f8b1412ade3b4d95d6f2762c3b9c96a755c0c5c3dd1a8d6514	2025-04-13 11:16:23.767018+00	20250407095602_add_description_to_competition	\N	\N	2025-04-13 11:16:23.762991+00	1
551b54b8-7c0e-45df-9f00-9fc76b6b6512	f1e4fd1a9674b94700d2f68d3e6dc1ba94ad563b82b9e9adaedd0f95b8e35f55	2025-04-13 11:16:23.774279+00	20250407101254_update_schema	\N	\N	2025-04-13 11:16:23.76892+00	1
d652a8f7-a9f0-4a4d-a390-b9c3070aec29	122cfd98a90416f45c83ba81862222d3bdfe67032995440e8c414b271868f226	2025-04-18 08:24:25.582791+00	20250418082425_add_avatar_to_user	\N	\N	2025-04-18 08:24:25.573549+00	1
a02317f7-1a24-4b02-89ef-74e6b80059a2	c8a5b0c9114339423fb13ce3e5347e06eda022f331709a2e727227f2e746de22	2025-04-18 08:40:14.23995+00	20250418084014_rm_avatar_url_from_user	\N	\N	2025-04-18 08:40:14.23308+00	1
529ff1d9-d8ad-443a-9c38-4a2b0850caf1	4351ff127a1f37198d29317c28c853bece06ee3162d34ca2251ebf4ee57d084f	2025-04-18 08:44:09.938231+00	20250418084409_add_profile_to_user	\N	\N	2025-04-18 08:44:09.921545+00	1
\.


--
-- Name: Club_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Club_id_seq"', 2, true);


--
-- Name: Compensator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Compensator_id_seq"', 2, true);


--
-- Name: CompetitionParticipants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompetitionParticipants_id_seq"', 4, true);


--
-- Name: Competition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Competition_id_seq"', 2, true);


--
-- Name: EventParticipants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EventParticipants_id_seq"', 4, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_id_seq"', 2, true);


--
-- Name: Grip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Grip_id_seq"', 3, true);


--
-- Name: Gun_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Gun_id_seq"', 2, true);


--
-- Name: Magazine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Magazine_id_seq"', 2, true);


--
-- Name: Profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Profile_id_seq"', 3, true);


--
-- Name: Result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Result_id_seq"', 2, true);


--
-- Name: Scope_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Scope_id_seq"', 2, true);


--
-- Name: Silencer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Silencer_id_seq"', 4, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 7, true);


--
-- Name: Club Club_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Club"
    ADD CONSTRAINT "Club_pkey" PRIMARY KEY (id);


--
-- Name: Compensator Compensator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Compensator"
    ADD CONSTRAINT "Compensator_pkey" PRIMARY KEY (id);


--
-- Name: CompetitionParticipants CompetitionParticipants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompetitionParticipants"
    ADD CONSTRAINT "CompetitionParticipants_pkey" PRIMARY KEY (id);


--
-- Name: Competition Competition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competition"
    ADD CONSTRAINT "Competition_pkey" PRIMARY KEY (id);


--
-- Name: EventParticipants EventParticipants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventParticipants"
    ADD CONSTRAINT "EventParticipants_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Grip Grip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Grip"
    ADD CONSTRAINT "Grip_pkey" PRIMARY KEY (id);


--
-- Name: Gun Gun_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gun"
    ADD CONSTRAINT "Gun_pkey" PRIMARY KEY (id);


--
-- Name: Magazine Magazine_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Magazine"
    ADD CONSTRAINT "Magazine_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: Result Result_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_pkey" PRIMARY KEY (id);


--
-- Name: Scope Scope_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Scope"
    ADD CONSTRAINT "Scope_pkey" PRIMARY KEY (id);


--
-- Name: Silencer Silencer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Silencer"
    ADD CONSTRAINT "Silencer_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _CompetitionParticipants _CompetitionParticipants_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompetitionParticipants"
    ADD CONSTRAINT "_CompetitionParticipants_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _EventParticipants _EventParticipants_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_EventParticipants"
    ADD CONSTRAINT "_EventParticipants_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _GunScopes _GunScopes_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_GunScopes"
    ADD CONSTRAINT "_GunScopes_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Club_clubName_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Club_clubName_key" ON public."Club" USING btree ("clubName");


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: _CompetitionParticipants_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CompetitionParticipants_B_index" ON public."_CompetitionParticipants" USING btree ("B");


--
-- Name: _EventParticipants_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_EventParticipants_B_index" ON public."_EventParticipants" USING btree ("B");


--
-- Name: _GunScopes_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_GunScopes_B_index" ON public."_GunScopes" USING btree ("B");


--
-- Name: CompetitionParticipants CompetitionParticipants_competitionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompetitionParticipants"
    ADD CONSTRAINT "CompetitionParticipants_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES public."Competition"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CompetitionParticipants CompetitionParticipants_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompetitionParticipants"
    ADD CONSTRAINT "CompetitionParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Competition Competition_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competition"
    ADD CONSTRAINT "Competition_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Competition Competition_gunId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Competition"
    ADD CONSTRAINT "Competition_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES public."Gun"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: EventParticipants EventParticipants_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventParticipants"
    ADD CONSTRAINT "EventParticipants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EventParticipants EventParticipants_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventParticipants"
    ADD CONSTRAINT "EventParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Event Event_clubId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES public."Club"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Grip Grip_gunId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Grip"
    ADD CONSTRAINT "Grip_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES public."Gun"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Gun Gun_compensatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gun"
    ADD CONSTRAINT "Gun_compensatorId_fkey" FOREIGN KEY ("compensatorId") REFERENCES public."Compensator"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Gun Gun_magazineId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gun"
    ADD CONSTRAINT "Gun_magazineId_fkey" FOREIGN KEY ("magazineId") REFERENCES public."Magazine"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Gun Gun_silencerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Gun"
    ADD CONSTRAINT "Gun_silencerId_fkey" FOREIGN KEY ("silencerId") REFERENCES public."Silencer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_competitionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES public."Competition"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_gunId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_gunId_fkey" FOREIGN KEY ("gunId") REFERENCES public."Gun"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Result Result_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Result"
    ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_clubId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES public."Club"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _CompetitionParticipants _CompetitionParticipants_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompetitionParticipants"
    ADD CONSTRAINT "_CompetitionParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES public."Competition"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CompetitionParticipants _CompetitionParticipants_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompetitionParticipants"
    ADD CONSTRAINT "_CompetitionParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _EventParticipants _EventParticipants_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_EventParticipants"
    ADD CONSTRAINT "_EventParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _EventParticipants _EventParticipants_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_EventParticipants"
    ADD CONSTRAINT "_EventParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GunScopes _GunScopes_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_GunScopes"
    ADD CONSTRAINT "_GunScopes_A_fkey" FOREIGN KEY ("A") REFERENCES public."Gun"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _GunScopes _GunScopes_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_GunScopes"
    ADD CONSTRAINT "_GunScopes_B_fkey" FOREIGN KEY ("B") REFERENCES public."Scope"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

