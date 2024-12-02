-- phpMyAdmin SQL Dump
-- version 5.2.1-4.fc40
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-12-2024 a las 20:41:27
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `entorno-inclusivo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answers`
--

CREATE TABLE `answers` (
  `id` bigint UNSIGNED NOT NULL,
  `assessment_id` bigint UNSIGNED NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer_text` text COLLATE utf8mb4_unicode_ci,
  `answer_enum` enum('Sí','No','Bueno','Regular','Malo') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `assessments`
--

CREATE TABLE `assessments` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `element_instance_id` bigint UNSIGNED NOT NULL,
  `status` enum('incomplete','complete') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'incomplete',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elements`
--

CREATE TABLE `elements` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `elements`
--

INSERT INTO `elements` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Escalera', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(2, 'Rampa', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(3, 'Señalética', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(4, 'Puerta', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(5, 'Sanitario', '2024-12-02 23:40:59', '2024-12-02 23:40:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `element_instances`
--

CREATE TABLE `element_instances` (
  `id` bigint UNSIGNED NOT NULL,
  `location_id` bigint UNSIGNED NOT NULL,
  `element_id` bigint UNSIGNED NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expected_answers`
--

CREATE TABLE `expected_answers` (
  `id` bigint UNSIGNED NOT NULL,
  `expected_answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `expected_answer_text` text COLLATE utf8mb4_unicode_ci,
  `expected_answer_enum` enum('Sí','No','Bueno','Regular','Malo') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `expected_answers`
--

INSERT INTO `expected_answers` (`id`, `expected_answer`, `question_id`, `expected_answer_text`, `expected_answer_enum`, `created_at`, `updated_at`) VALUES
(1, 'Sí', 1, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(2, 'Sí', 2, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(3, 'Sí', 3, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(4, 'Sí', 4, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(5, 'Sí', 5, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(6, 'Sí', 6, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(7, 'Sí', 7, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(8, 'Sí', 8, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(9, 'Sí', 9, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(10, 'Sí', 10, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(11, 'Sí', 11, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(12, 'Sí', 12, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(13, 'Sí', 13, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(14, 'Sí', 14, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(15, 'Bueno', 15, NULL, 'Bueno', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(16, 'Sí', 16, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(17, 'Sí', 17, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(18, 'Sí', 18, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(19, 'Sí', 19, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(20, 'Sí', 20, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(21, 'Sí', 21, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(22, 'Sí', 22, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(23, 'Sí', 23, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(24, 'Sí', 24, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(25, 'Sí', 25, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(26, 'Sí', 26, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(27, 'Sí', 27, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(28, 'Sí', 28, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(29, 'Bueno', 29, NULL, 'Bueno', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(30, 'Sí', 30, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(31, 'Sí', 31, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(32, 'Sí', 32, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(33, 'Sí', 33, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(34, 'Sí', 34, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(35, 'Sí', 35, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(36, 'Sí', 36, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(37, 'Sí', 37, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(38, 'Sí', 38, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(39, 'Sí', 39, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(40, 'Sí', 40, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(41, 'Sí', 41, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(42, 'Sí', 42, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(43, 'Sí', 43, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(44, 'Bueno', 44, NULL, 'Bueno', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(45, 'Sí', 45, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(46, 'Sí', 46, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(47, 'Sí', 47, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(48, 'Sí', 48, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(49, 'Sí', 49, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(50, 'Sí', 50, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(51, 'Sí', 51, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(52, 'Sí', 52, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(53, 'Sí', 53, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(54, 'Sí', 54, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(55, 'Bueno', 55, NULL, 'Bueno', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(56, 'Sí', 56, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(57, 'Sí', 57, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(58, 'Sí', 58, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(59, 'Sí', 59, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(60, 'Sí', 60, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(61, 'Sí', 61, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(62, 'Sí', 62, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(63, 'Sí', 63, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(64, 'Sí', 64, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(65, 'Sí', 65, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(66, 'Sí', 66, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(67, 'Sí', 67, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(68, 'Sí', 68, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(69, 'Sí', 69, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(70, 'Sí', 70, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(71, 'Sí', 71, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(72, 'Sí', 72, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(73, 'Sí', 73, NULL, 'Sí', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(74, 'Bueno', 74, NULL, 'Bueno', '2024-12-02 23:40:59', '2024-12-02 23:40:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, '1- Rectorado', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(2, '2- Biblioteca', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(3, '3- Bloque 1,2 y 3', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(4, '4- Bloque 4', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(5, '5- Aula', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(6, '6- IMASL', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(7, '7- CCT', '2024-12-02 23:40:59', '2024-12-02 23:40:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metrics`
--

CREATE TABLE `metrics` (
  `id` bigint UNSIGNED NOT NULL,
  `element_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `metrics`
--

INSERT INTO `metrics` (`id`, `element_id`, `name`, `description`, `weight`, `created_at`, `updated_at`) VALUES
(1, 1, 'Seguridad Estructural', 'Evalúa aspectos fundamentales de la estructura como dimensiones y estabilidad', 30.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(2, 1, 'Elementos de Apoyo', 'Evalúa la presencia y calidad de elementos de apoyo como pasamanos', 40.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(3, 1, 'Accesibilidad y Señalización', 'Evalúa elementos de accesibilidad y señalización', 30.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(4, 2, 'Dimensiones y Pendiente', 'Evalúa el ancho, la pendiente y la longitud de la rampa', 40.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(5, 2, 'Elementos de Seguridad', 'Evalúa la presencia y calidad de elementos de seguridad como pasamanos y descansos', 30.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(6, 2, 'Accesibilidad y Señalización', 'Evalúa elementos de accesibilidad y señalización', 30.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(7, 3, 'Visibilidad y Legibilidad', 'Evalúa la claridad visual, ubicación y legibilidad de la señalética', 35.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(8, 3, 'Accesibilidad Universal', 'Evalúa la inclusión de elementos para diferentes tipos de discapacidad', 35.00, '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(9, 4, 'Ancho Libre y Apertura', 'Evalúa el ancho libre de paso, el ángulo de apertura y el espacio de maniobra', 35.00, '2024-12-02 23:41:00', '2024-12-02 23:41:00'),
(10, 4, 'Accesibilidad y Señalización', 'Evalúa la altura de la manija, la mirilla y la señalización', 35.00, '2024-12-02 23:41:00', '2024-12-02 23:41:00'),
(11, 5, 'Espacio Libre y Giro', 'Evalúa el espacio libre para giro, el ancho lateral del inodoro y la profundidad frontal', 35.00, '2024-12-02 23:41:00', '2024-12-02 23:41:00'),
(12, 5, 'Accesibilidad del Inodoro', 'Evalúa la altura del asiento del inodoro y la accesibilidad de las barras de apoyo', 35.00, '2024-12-02 23:41:00', '2024-12-02 23:41:00'),
(13, 5, 'Accesibilidad del Lavamanos y Ducha', 'Evalúa la altura del lavamanos, la ducha y sus elementos', 30.00, '2024-12-02 23:41:00', '2024-12-02 23:41:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metric_question`
--

CREATE TABLE `metric_question` (
  `id` bigint UNSIGNED NOT NULL,
  `metric_id` bigint UNSIGNED NOT NULL,
  `question_id` bigint UNSIGNED NOT NULL,
  `question_weight` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `metric_question`
--

INSERT INTO `metric_question` (`id`, `metric_id`, `question_id`, `question_weight`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2.02, NULL, NULL),
(2, 1, 2, 2.88, NULL, NULL),
(3, 1, 3, 2.88, NULL, NULL),
(4, 1, 4, 2.88, NULL, NULL),
(5, 1, 5, 1.44, NULL, NULL),
(6, 2, 6, 3.85, NULL, NULL),
(7, 2, 7, 1.92, NULL, NULL),
(8, 2, 8, 1.92, NULL, NULL),
(9, 2, 9, 2.69, NULL, NULL),
(10, 2, 10, 3.08, NULL, NULL),
(11, 2, 11, 1.92, NULL, NULL),
(12, 3, 12, 1.44, NULL, NULL),
(13, 3, 13, 2.88, NULL, NULL),
(14, 3, 14, 2.02, NULL, NULL),
(15, 4, 16, 4.71, NULL, NULL),
(16, 4, 17, 3.76, NULL, NULL),
(17, 4, 18, 3.29, NULL, NULL),
(18, 4, 19, 2.35, NULL, NULL),
(19, 5, 20, 3.53, NULL, NULL),
(20, 5, 21, 2.47, NULL, NULL),
(21, 5, 22, 1.06, NULL, NULL),
(22, 5, 23, 1.76, NULL, NULL),
(23, 5, 24, 2.47, NULL, NULL),
(24, 6, 25, 1.76, NULL, NULL),
(25, 6, 26, 1.76, NULL, NULL),
(26, 6, 27, 2.82, NULL, NULL),
(27, 6, 28, 1.76, NULL, NULL),
(28, 7, 30, 3.65, NULL, NULL),
(29, 7, 31, 1.82, NULL, NULL),
(30, 7, 32, 1.82, NULL, NULL),
(31, 7, 33, 2.92, NULL, NULL),
(32, 7, 34, 2.92, NULL, NULL),
(33, 7, 35, 1.82, NULL, NULL),
(34, 7, 36, 3.65, NULL, NULL),
(35, 8, 37, 1.82, NULL, NULL),
(36, 8, 38, 1.82, NULL, NULL),
(37, 8, 39, 1.82, NULL, NULL),
(38, 8, 40, 1.82, NULL, NULL),
(39, 8, 41, 1.82, NULL, NULL),
(40, 8, 42, 1.82, NULL, NULL),
(41, 8, 43, 1.82, NULL, NULL),
(42, 8, 44, 3.65, NULL, NULL),
(43, 9, 45, 5.56, NULL, NULL),
(44, 9, 46, 3.89, NULL, NULL),
(45, 9, 47, 4.44, NULL, NULL),
(46, 9, 48, 2.78, NULL, NULL),
(47, 9, 49, 2.78, NULL, NULL),
(48, 9, 50, 2.78, NULL, NULL),
(49, 10, 51, 2.78, NULL, NULL),
(50, 10, 52, 2.78, NULL, NULL),
(51, 10, 53, 2.78, NULL, NULL),
(52, 10, 54, 4.44, NULL, NULL),
(53, 11, 56, 3.18, NULL, NULL),
(54, 11, 57, 2.23, NULL, NULL),
(55, 11, 58, 1.59, NULL, NULL),
(56, 11, 59, 2.23, NULL, NULL),
(57, 11, 60, 1.59, NULL, NULL),
(58, 11, 61, 2.23, NULL, NULL),
(59, 11, 62, 1.59, NULL, NULL),
(60, 12, 63, 2.55, NULL, NULL),
(61, 12, 64, 1.59, NULL, NULL),
(62, 12, 65, 2.23, NULL, NULL),
(63, 12, 66, 1.59, NULL, NULL),
(64, 12, 67, 1.59, NULL, NULL),
(65, 12, 68, 1.59, NULL, NULL),
(66, 12, 69, 1.59, NULL, NULL),
(67, 12, 70, 2.23, NULL, NULL),
(68, 13, 71, 1.36, NULL, NULL),
(69, 13, 72, 1.36, NULL, NULL),
(70, 13, 73, 1.91, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(690, '0001_01_01_000000_create_users_table', 1),
(691, '0001_01_01_000001_create_cache_table', 1),
(692, '0001_01_01_000002_create_jobs_table', 1),
(693, '2024_09_28_212143_add_role_to_users_table', 1),
(694, '2024_10_06_000000_create_locations_table', 1),
(695, '2024_10_06_000001_create_elements_table', 1),
(696, '2024_10_06_000002_create_element_instances_table', 1),
(697, '2024_10_06_000003_create_assessments_table', 1),
(698, '2024_10_06_000004_create_questions_table', 1),
(699, '2024_10_06_000005_create_answers_table', 1),
(700, '2024_10_06_000006_create_expected_answers_table', 1),
(701, '2024_10_28_210704_create_metrics_table', 1),
(702, '2024_11_06_041829_create_reports_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `questions`
--

CREATE TABLE `questions` (
  `id` bigint UNSIGNED NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `context` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `element_id` bigint UNSIGNED NOT NULL,
  `answer_types` json DEFAULT (json_array(_utf8mb4'text')),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `questions`
--

INSERT INTO `questions` (`id`, `content`, `context`, `element_id`, `answer_types`, `created_at`, `updated_at`) VALUES
(1, '¿El tramo de escalera cumple con la cantidad de alzadas corridas entre descansos?', 'Las escaleras no deben tener más de 12 alzadas corridas entre descansos. Esto es importante para asegurar la seguridad y permitir descansos adecuados en recorridos largos.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(2, '¿La escalera cumple con el ancho libre?', 'El ancho mínimo entre los zócalos debe ser de 1.20 metros para garantizar que las personas, incluidas aquellas con movilidad reducida o en silla de ruedas, puedan utilizarla cómodamente. En lotes más pequeños (8.66 metros o menos de ancho), este puede reducirse a 1.10 metros.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(3, '¿Los escalones de la escalera son iguales entre sí?', 'Todos los escalones de la escalera deben ser de la misma altura y profundidad, asegurando un patrón de movimiento uniforme y reduciendo el riesgo de accidentes.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(4, '¿Los escalones de escalera cumplen con el ancho mínimo y máximo de pedada y alzada?', 'La altura de los escalones (alzada) debe estar entre 0.15 metros y 0.18 metros, mientras que la profundidad de la huella (pedada) debe estar entre 0.26 metros y 0.30 metros para facilitar el desplazamiento seguro y cómodo.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(5, 'Si la escalera cuenta con un descanso, ¿cumple con el ancho mínimo establecido?', 'Los descansos deben tener una profundidad mínima de dos tercios del ancho de la escalera, o al menos 1.25 metros si hay giros de 90° o 180°. Si es un tramo recto sin giros, el mínimo es de 0.95 metros.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(6, '¿La escalera cuenta con pasamanos en ambos lados?', 'Es esencial que las escaleras tengan pasamanos en ambos lados para ofrecer apoyo tanto a personas diestras como zurdas, mejorando la seguridad tanto en subida como en bajada.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(7, '¿Los pasamanos cumplen con las medidas establecidas?', 'Los pasamanos deben estar a una altura de 0.90 metros desde la nariz del escalón hasta el plano superior del pasamanos. Además, deben tener un diámetro mínimo de 0.04 metros para facilitar su agarre.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(8, '¿Si los pasamanos cuentan con extensión horizontal esta cuenta con las medidas establecidas?', 'Los pasamanos deben extenderse horizontalmente antes y después del tramo de escalones por una longitud mínima de 0.15 metros y un máximo de 0.40 metros para mejorar la accesibilidad.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(9, '¿Los pasamanos cumplen con la longitud total?', 'La longitud total de los pasamanos debe abarcar todo el recorrido de la escalera, incluyendo la extensión en los descansos cuando sea necesario, para ofrecer apoyo continuo.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(10, '¿La escalera cuenta con zócalos?', 'Si uno o ambos lados de la escalera no tienen una contención lateral, deben incluir zócalos de al menos 0.10 metros de altura para evitar que bastones o sillas de ruedas se deslicen hacia fuera.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(11, '¿Los zócalos cumplen con las medidas establecidas?', 'Los zócalos deben tener una altura mínima de 0.10 metros, cumpliendo con las normativas de seguridad.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(12, '¿La escalera cuenta con solado de prevención?', 'El solado de prevención, formado por baldosas con relieves y colores contrastantes, es clave para advertir a personas con discapacidad visual sobre la presencia de escaleras y posibles peligros.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(13, 'Si la escalera es suspendida cumple con las medidas establecidas para este tipo de acceso?', 'Las escaleras suspendidas deben estar señalizadas con un solado contrastante y botones de relieve que sobresalgan 0.60 metros más allá de los bordes laterales para impedir el paso y advertir de la escalera.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(14, '¿Observa algún tipo de señalética accesible de escalera?', 'Las escaleras deben estar señalizadas de manera adecuada con pictogramas accesibles y, si es necesario, incluir información en Braille.', 1, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(15, 'Según lo comprendido, observado y calculado; ¿cuál es el estado de la escalera?', 'El estado de la escalera debe evaluarse como Bueno (B), Regular (R) o Malo (M), según cumpla con los criterios de accesibilidad establecidos.', 1, '[\"enum_quality\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(16, '¿La rampa cumple con el ancho mínimo y máximo establecido?', 'El ancho de la rampa debe estar entre 0.90 metros y 1.20 metros, permitiendo el tránsito adecuado de personas con movilidad reducida, incluidas aquellas que utilizan sillas de ruedas.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(17, 'De acuerdo con la fórmula para calcular la pendiente y los cuadros de referencia, la rampa ¿cumple con la pendiente adecuada máxima de 8 %?', 'La pendiente de la rampa no debe exceder el 8%, para asegurar que sea accesible sin demasiado esfuerzo físico. Se calcula multiplicando la altura a salvar por el valor de relación (por ejemplo, 1/12.5).', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(18, '¿La rampa cuenta con solado de prevención?', 'El solado de prevención, constituido por baldosas con relieves, es esencial para advertir a las personas, especialmente con discapacidad visual, sobre cambios o peligros en el camino.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(19, '¿El color del solado es contrastante?', 'El color del solado de prevención debe ser contrastante respecto al suelo circundante, lo que facilita su detección por parte de personas con discapacidad visual.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(20, '¿Cuenta con pasamanos?', 'Las rampas deben tener pasamanos dobles y continuos a ambos lados para que las personas puedan sujetarse, tanto al subir como al bajar.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(21, 'En caso de poseer pasamanos dobles, ¿cumple con las medidas establecidas?', 'Los pasamanos deben estar colocados a una altura de entre 0.75 y 0.90 metros y deben sobresalir entre 0.15 y 0.20 metros más allá del borde de la rampa.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(22, '¿Los laterales tienen algún tipo de contención?', 'Los laterales de la rampa deben contar con barreras de contención, como zócalos o muros, para evitar que sillas de ruedas o bastones se deslicen fuera de la rampa.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(23, '¿Si no tienen, cuenta con zócalo?', 'Si la rampa no tiene muros laterales, debe contar con un zócalo de al menos 0.10 metros de altura para impedir que las ruedas de las sillas de ruedas o bastones se deslicen fuera.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(24, '¿Hay descansos en las distancias correspondientes?', 'Las rampas deben contar con descansos cada 6 metros para permitir que las personas puedan detenerse y descansar si lo necesitan. El descanso debe tener un largo mínimo de 1.50 metros.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(25, '¿Permite giro de 90° a usuarios en silla de ruedas y ambulantes?', 'El descanso en la rampa debe permitir giros de 90° para que los usuarios en silla de ruedas o con movilidad reducida puedan cambiar de dirección cómodamente.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(26, '¿Permite giro de 180° a usuarios en silla de ruedas y ambulantes?', 'Si la rampa tiene varios tramos, debe contar con descansos que permitan realizar giros de 180°, brindando suficiente espacio para maniobrar.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(27, '¿Cumple con el largo mínimo?', 'El largo mínimo de la rampa depende de la altura que debe salvarse, y debe estar de acuerdo con la pendiente máxima permitida (8%).', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(28, '¿Observa algún tipo de señalética accesible de rampa?', 'Las rampas deben estar señalizadas adecuadamente con pictogramas accesibles y, si es necesario, incluir información en Braille.', 2, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(29, '¿Según lo comprendido, observado y calculado; cuál es el estado de la rampa?', 'El estado de la rampa debe evaluarse como Bueno (B), Regular (R) o Malo (M), según cumpla con los criterios establecidos para accesibilidad.', 2, '[\"enum_quality\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(30, '¿En el edificio hay señalética accesible?', 'La señalética accesible es aquella que permite a personas con discapacidades orientarse, comunicarse y moverse por el entorno de manera autónoma, utilizando pictogramas, textos, símbolos y otros elementos que son perceptibles tanto para personas sin discapacidad como para aquellas con discapacidades sensoriales o de movilidad.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(31, '¿La señalética posee el símbolo internacional de accesibilidad?', 'El símbolo internacional de accesibilidad representa la independencia y participación activa de las personas con discapacidad. Este símbolo debe estar presente en la señalética para indicar accesibilidad.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(32, '¿La señalética tiene una buena iluminación?', 'Es fundamental que la señalética esté bien iluminada para garantizar su visibilidad a todas horas, lo que facilita su lectura y comprensión, especialmente para personas con baja visión.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(33, '¿La señalética se encuentra libre de obstáculos?', 'La señalética debe estar colocada en lugares donde no existan objetos o barreras que impidan su visibilidad o acceso, lo que facilita que las personas con movilidad reducida o discapacidades sensoriales puedan usarla.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(34, '¿La tipografía utilizada es legible?', 'La legibilidad de la tipografía es clave, recomendándose el uso de fuentes como Sans Serif y evitar abreviaciones o frases complejas para facilitar la lectura rápida y clara.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(35, '¿Se encuentra protegida con cristal o algún otro elemento?', 'Se debe evitar proteger la señalética con cristales u otros elementos que puedan reflejar luz o dificultar su visibilidad y comprensión.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(36, '¿El edificio posee señalética en sistema Braille?', 'El sistema Braille es esencial para personas con discapacidad visual, permitiendo la lectura táctil de la información en la señalética.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(37, '¿El edificio posee plano háptico?', 'Los planos hápticos son representaciones táctiles del entorno que permiten a las personas, especialmente con discapacidad visual, orientarse y conocer la distribución del espacio.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(38, '¿El plano háptico se encuentra próximo al ingreso del edificio?', 'Es importante que el plano háptico esté ubicado cerca del ingreso del edificio para que sea accesible desde el momento en que la persona entra al lugar.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(39, '¿Posee intérprete de señas?', 'La presencia de intérpretes de lengua de señas asegura la accesibilidad para personas con discapacidad auditiva, facilitando la comunicación.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(40, '¿El edificio cuenta con formatos audiovisuales?', 'Los formatos audiovisuales accesibles incluyen subtitulado, audio descripción y locución, lo que permite a personas con discapacidades sensoriales acceder a la información de manera inclusiva.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(41, '¿El edificio posee señales audibles?', 'Las señales audibles son importantes para personas con discapacidad visual, permitiendo que la información visual sea replicada mediante sonido, como anuncios por megafonía.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(42, '¿El audio contiene descripción y/o locución?', 'La audio descripción y locución proporcionan detalles adicionales sobre el entorno o eventos importantes para personas con discapacidad visual.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(43, '¿El edificio cuenta con asistencia humana en caso de ser necesario?', 'La asistencia humana puede ser proporcionada mediante guías, intérpretes o personal de apoyo que ayuden a las personas con discapacidades a moverse por el edificio o acceder a servicios.', 3, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(44, 'Según lo comprendido, observado y calculado; ¿cuál es el estado de la señalética?', 'El estado de la señalética se debe evaluar como Bueno (B), Regular (R) o Malo (M), considerando si cumple o no con los estándares de accesibilidad descritos.', 3, '[\"enum_quality\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(45, '¿La puerta cumple con el ancho mínimo establecido?', 'Las puertas deben tener un ancho suficiente para permitir el paso de personas con movilidad reducida, incluidas aquellas que utilizan sillas de ruedas. El ancho mínimo recomendado es de 0.80 metros.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(46, '¿La puerta cuenta con el ángulo de apertura establecido?', 'Las puertas deben abrirse al menos 90° para facilitar el acceso. Esto es especialmente importante para asegurar que las personas puedan entrar y salir sin dificultad.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(47, '¿La puerta cuenta con mecanismo de apertura?', 'Las puertas deben contar con un mecanismo de apertura que sea fácil de usar para todas las personas, incluidos aquellos con limitaciones de fuerza. Esto puede incluir manijas o pomos que no requieran girar la muñeca.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(48, '¿El herraje de apertura cuenta con las medidas establecidas?', 'Los herrajes deben estar ubicados a una altura accesible (generalmente entre 0.80 m y 1.20 m desde el suelo) para que todas las personas puedan alcanzarlos y utilizarlos sin dificultad.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(49, '¿La puerta cuenta con herrajes de retención?', 'Las puertas de dos o más hojas deben tener pasadores que se puedan accionar desde una altura accesible para garantizar que puedan mantenerse abiertas cuando sea necesario.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(50, '¿Los herrajes de retención cumplen con las medidas mínimas y máximas establecidas?', 'Es importante que los herrajes de retención estén dentro de las dimensiones específicas establecidas para asegurar que sean utilizables por todas las personas, incluidas aquellas con discapacidades.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(51, '¿El cerrojo de seguridad cumple con lo establecido?', 'Los cerrojos deben ser de fácil acceso y deben poder accionarse desde el interior en caso de emergencia, evitando el uso de cerraduras con llaves que podrían complicar la salida rápida.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(52, '¿La puerta cuenta con herrajes suplementarios?', 'Los herrajes suplementarios son aquellos que facilitan el uso de la puerta por personas de diferentes alturas. Deben estar colocados de manera que todos los usuarios puedan acceder a ellos.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(53, '¿Los herrajes suplementarios cuentan con las medidas establecidas?', 'Estos herrajes deben cumplir con las dimensiones adecuadas para ser accesibles y utilizables por todos, garantizando la funcionalidad de la puerta.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(54, '¿Observa algún tipo de señalética accesible de puerta?', 'Es esencial que las puertas cuenten con señalización adecuada que indique su función y acceso, utilizando pictogramas y, si es necesario, información en Braille.', 4, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(55, 'Según lo comprendido, observado y calculado; ¿cuál es el estado de la puerta?', 'El estado de la puerta debe evaluarse como Bueno (B), Regular (R) o Malo (M), basándose en si cumple con los criterios de accesibilidad establecidos.', 4, '[\"enum_quality\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(56, '¿El baño cumple con las dimensiones mínimas establecidas?', 'Es esencial que el baño tenga un espacio adecuado (mínimo de 1.5 metros cuadrados) para permitir la maniobra de una silla de ruedas, garantizando que todas las personas puedan utilizarlo sin restricciones.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(57, '¿El inodoro cumple con las medidas mínimas de aproximación establecidas?', 'Debe haber suficiente espacio lateral (0.80 metros) y frontal (0.90 metros) alrededor del inodoro para facilitar la transferencia desde una silla de ruedas, asegurando un acceso cómodo y seguro.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(58, '¿El baño cumple con la medida mínima de altura de taza de inodoro?', 'La altura de la taza del inodoro debe estar entre 0.50 y 0.52 metros desde el nivel del suelo para facilitar el uso por personas con diferentes capacidades físicas.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(59, '¿El baño cuenta con barras de apoyo y transferencia?', 'Las barras de apoyo son esenciales para ayudar a las personas a levantarse y sentarse en el inodoro. Deben estar fijadas firmemente y ubicarse a una altura accesible (0.75 m a 0.80 m).', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(60, '¿Las barras de apoyo y transferencia cuentan con las medidas establecidas?', 'Las barras deben cumplir con las dimensiones específicas para asegurar su eficacia y seguridad, sobrepasando el borde del inodoro para brindar apoyo adicional.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(61, '¿El baño cuenta con bacha o mesada?', 'Es importante que el baño tenga un lavabo accesible, que debe estar colocado a una altura adecuada para permitir su uso desde una silla de ruedas.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(62, '¿La bacha o mesada cumple con las medidas establecidas?', 'La bacha debe tener dimensiones que permitan su uso cómodo por personas con diferentes capacidades, asegurando que se pueda acceder sin obstáculos.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(63, '¿La bacha o mesada cumple con las medidas de superficie mínima de aproximación?', 'Debe haber suficiente espacio frente al lavabo (1.00 metro de profundidad) y a los lados (0.40 metros) para permitir el acceso y la utilización del mismo.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(64, '¿La bacha o mesada cuenta con acceso libre?', 'El área debajo del lavabo no debe tener muebles o estructuras que impidan el acercamiento de una silla de ruedas, garantizando así un acceso total.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(65, '¿El baño cuenta con espejo?', 'Los espejos deben estar instalados a una altura que permita su uso desde una silla de ruedas, facilitando la visibilidad sin necesidad de ajustar la posición.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(66, '¿El espejo cumple con las medidas establecidas?', 'Debe cumplir con las dimensiones adecuadas y estar diseñado para facilitar el uso por personas con diversas capacidades, asegurando que sea funcional.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(67, '¿La grifería cumple con lo establecido?', 'La grifería debe ser de fácil acceso y operar de manera simple (por ejemplo, tipo palanca) para que todas las personas puedan usarla sin dificultad.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(68, '¿El pulsador sanitario de emergencia cumple con las medidas establecidas?', 'Debe estar colocado a una altura accesible (entre 0.40 m y 0.50 m) y ser fácil de usar en caso de necesidad urgente.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(69, 'El baño en caso de contar con ducha, ¿cumple con las medidas establecidas?', 'La ducha debe tener suficiente espacio y un diseño accesible (0.90 m x 0.90 m) para facilitar su uso por personas con discapacidades.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(70, '¿El baño cuenta con accesorios?', 'Los accesorios del baño (como toalleros y llaves de luz) deben estar ubicados en posiciones accesibles, dentro del alcance de las personas en silla de ruedas.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(71, '¿Los accesorios de baño cumplen con las medidas establecidas?', 'Deben estar situados a una altura que permita su uso sin dificultad, asegurando que sean accesibles para todos los usuarios.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(72, '¿Observa algún tipo de señalética accesible de baño?', 'La señalética en el baño debe ser clara y accesible, utilizando pictogramas y, si es necesario, información en Braille para facilitar la comprensión.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(73, '¿La señalética accesible cuenta con las medidas establecidas?', 'La señalética debe cumplir con las dimensiones adecuadas para ser legible y comprensible, asegurando su efectividad para todas las personas.', 5, '[\"enum_yesno\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59'),
(74, 'Según lo comprendido, observado y calculado; ¿cuál es el estado del baño?', 'El estado del baño debe evaluarse como Bueno (B), Regular (R) o Malo (M), dependiendo de si cumple o no con los criterios de accesibilidad establecidos.', 5, '[\"enum_quality\", \"text\"]', '2024-12-02 23:40:59', '2024-12-02 23:40:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reports`
--

CREATE TABLE `reports` (
  `id` bigint UNSIGNED NOT NULL,
  `assessment_id` bigint UNSIGNED NOT NULL,
  `final_score` decimal(5,2) NOT NULL,
  `accessibility_level` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `metrics_scores` json NOT NULL,
  `recommendations` json NOT NULL,
  `main_findings` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` tinyint UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Administrador', 'admin@admin.com', NULL, '$2y$12$Jev.4uAv61fbq64XUYsyDOkRo44N7.R8YGbsEeA2CDnbIz.tO4WH6', NULL, '2024-12-02 23:40:58', '2024-12-02 23:40:58', 0),
(2, 'Técnico', 'tech@tech.com', NULL, '$2y$12$cXx61FFZ6ZaHyUdQJ7tpHerptLJeM/H5o9poXHFOSnrKuMMgmW6wi', NULL, '2024-12-02 23:40:58', '2024-12-02 23:40:58', 1),
(3, 'Supervisor', 'supervisor@supervisor.com', NULL, '$2y$12$JMBmFdSvijj9olsQZSMwR.pdKKRIrcUJwVVXoGJFRI1tSuj1tOsBO', NULL, '2024-12-02 23:40:59', '2024-12-02 23:40:59', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answers_assessment_id_foreign` (`assessment_id`),
  ADD KEY `answers_question_id_foreign` (`question_id`);

--
-- Indices de la tabla `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessments_user_id_foreign` (`user_id`),
  ADD KEY `assessments_element_instance_id_foreign` (`element_instance_id`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `element_instances`
--
ALTER TABLE `element_instances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `element_instances_location_id_foreign` (`location_id`),
  ADD KEY `element_instances_element_id_foreign` (`element_id`);

--
-- Indices de la tabla `expected_answers`
--
ALTER TABLE `expected_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expected_answers_question_id_foreign` (`question_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metrics`
--
ALTER TABLE `metrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `metrics_element_id_foreign` (`element_id`);

--
-- Indices de la tabla `metric_question`
--
ALTER TABLE `metric_question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `metric_question_metric_id_foreign` (`metric_id`),
  ADD KEY `metric_question_question_id_foreign` (`question_id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_element_id_foreign` (`element_id`);

--
-- Indices de la tabla `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_assessment_id_foreign` (`assessment_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `answers`
--
ALTER TABLE `answers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `elements`
--
ALTER TABLE `elements`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `element_instances`
--
ALTER TABLE `element_instances`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `expected_answers`
--
ALTER TABLE `expected_answers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `metrics`
--
ALTER TABLE `metrics`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `metric_question`
--
ALTER TABLE `metric_question`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=703;

--
-- AUTO_INCREMENT de la tabla `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `reports`
--
ALTER TABLE `reports`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_element_instance_id_foreign` FOREIGN KEY (`element_instance_id`) REFERENCES `element_instances` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assessments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `element_instances`
--
ALTER TABLE `element_instances`
  ADD CONSTRAINT `element_instances_element_id_foreign` FOREIGN KEY (`element_id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `element_instances_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `expected_answers`
--
ALTER TABLE `expected_answers`
  ADD CONSTRAINT `expected_answers_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `metrics`
--
ALTER TABLE `metrics`
  ADD CONSTRAINT `metrics_element_id_foreign` FOREIGN KEY (`element_id`) REFERENCES `elements` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `metric_question`
--
ALTER TABLE `metric_question`
  ADD CONSTRAINT `metric_question_metric_id_foreign` FOREIGN KEY (`metric_id`) REFERENCES `metrics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `metric_question_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_element_id_foreign` FOREIGN KEY (`element_id`) REFERENCES `elements` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
