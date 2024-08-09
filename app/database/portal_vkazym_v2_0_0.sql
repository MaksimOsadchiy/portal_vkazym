-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 09 2024 г., 10:56
-- Версия сервера: 8.0.36
-- Версия PHP: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `portal_vkazym_v2.0.0`
--

-- --------------------------------------------------------

--
-- Структура таблицы `applications`
--

CREATE TABLE `applications` (
                                `id` int NOT NULL,
                                `user_id` int NOT NULL,
                                `title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                `status` tinyint(1) NOT NULL DEFAULT '0',
                                `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `title`, `content`, `status`, `date`) VALUES
                                                                                       (2, 24, 'ываммавммвмвмвмвмвавма', 'вамвмвмамвмаммввм', 2, '2024-07-23 14:49:20'),
                                                                                       (3, 30, 'ЗАГОловок', 'Текстататата', 0, '2024-07-23 16:00:00'),
                                                                                       (4, 26, 'ТТТЕММа', 'ТЕксста ТЕксста ТЕксста ТЕксста', 0, '2024-07-24 10:49:20'),
                                                                                       (5, 26, '', 'выаааааааааа', 0, '2024-07-22 11:29:20'),
                                                                                       (6, 26, '', 'авпымводшмв', 0, '2024-07-25 14:49:20'),
                                                                                       (7, 26, '', 'дщдщдolololooolooolo', 2, '2024-07-25 10:45:48'),
                                                                                       (8, 26, '', 'ещё заявввввккакакакакаааа', 0, '2024-07-25 14:49:20'),
                                                                                       (9, 29, 'ТЕмамамама', 'Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее Соедержаниееееее ', 1, '2024-07-24 16:51:33'),
                                                                                       (11, 29, 'Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема Тема ', 'СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание СОдержание ', 1, '2024-07-25 14:49:20'),
                                                                                       (12, 29, 'ТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТемаТема ', 'СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕО  ', 1, '2024-07-25 14:49:20'),
                                                                                       (13, 29, '', 'СОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕОСОЕДЕ', 2, '2024-07-22 19:54:38'),
                                                                                       (14, 29, 'ffffffffff', 'xxxxxxxxxxxxxxxxxcccccccccccccccccccc', 1, '2024-07-23 16:35:06'),
                                                                                       (15, 27, 'fsf', 'fffffffffffffffffffffffffffffffffffff', 3, '2024-07-25 14:49:20'),
                                                                                       (16, 27, 'ЗАПРОС', 'ЗЗЗАЗАЗАЗАЗ', 2, '2024-07-24 12:30:20'),
                                                                                       (17, 27, 'sdfffffff', 'sdfsccccccccccccccccccccc', 2, '2024-07-24 17:40:36'),
                                                                                       (18, 27, 'sdd', 'cccccccccccccccccccccccccccccccccccccccccxxxxx', 2, '2024-07-25 14:49:20'),
                                                                                       (19, 25, 'njfkl', 'vvvvvvvvvvvvvvvvvv', 2, '2024-07-24 19:54:52'),
                                                                                       (20, 25, 'ffffffff', 'ffffff', 3, '2024-07-25 14:49:20'),
                                                                                       (24, 27, 'Тема', 'Содержание', 1, '2024-07-29 11:38:54');

-- --------------------------------------------------------

--
-- Структура таблицы `application_status`
--

CREATE TABLE `application_status` (
                                      `id` int NOT NULL,
                                      `value` tinyint NOT NULL,
                                      `transcript` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `application_status`
--

INSERT INTO `application_status` (`id`, `value`, `transcript`) VALUES
                                                                   (1, 0, 'Заявка в очереди на рассмотрение'),
                                                                   (2, 1, 'Заявка в работе'),
                                                                   (3, 2, 'Заявка выполнена'),
                                                                   (4, 3, 'Заявка отклонена');

-- --------------------------------------------------------

--
-- Структура таблицы `companies`
--

CREATE TABLE `companies` (
                             `id` int NOT NULL,
                             `firm` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                             `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `companies`
--

INSERT INTO `companies` (`id`, `firm`, `location`) VALUES
                                                       (1, 'АЗТПА', 'Россия'),
                                                       (2, 'Волгограднефтемаш', 'Россия'),
                                                       (3, 'Уралхиммаш', 'Россия'),
                                                       (4, 'Грове', 'Италия'),
                                                       (5, 'Дзержинскхиммаш', 'Россия'),
                                                       (6, 'JSW', 'Япония'),
                                                       (7, 'Борзиг', 'Германия'),
                                                       (8, 'Китамура', 'Япония'),
                                                       (9, 'Кобе Стил', 'Япония'),
                                                       (10, 'Минхиммаш', 'Россия'),
                                                       (11, 'Петрозаводскбуммаш', 'Россия'),
                                                       (12, 'Сигма Дольни Бенешов', 'Чехия'),
                                                       (13, 'Усть-Каменогорский АЗ', 'Казахстан'),
                                                       (14, 'Цимлянский МЗ', 'Россия'),
                                                       (15, 'ЧКД Бланско', 'Чехия'),
                                                       (16, 'Электрохимприбор', 'Россия'),
                                                       (17, 'Биффи', 'Италия'),
                                                       (18, 'Днепртяжбуммаш', 'Украина'),
                                                       (19, 'Ледиин', 'Италия');

-- --------------------------------------------------------

--
-- Структура таблицы `crane_classes`
--

CREATE TABLE `crane_classes` (
                                 `id` int NOT NULL,
                                 `name` varchar(31) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `crane_classes`
--

INSERT INTO `crane_classes` (`id`, `name`) VALUES
                                               (6, 'Линейный'),
                                               (4, 'Перемчка'),
                                               (8, 'Северная перемычка(СП)'),
                                               (3, 'Южная перемычка(ЮП)');

-- --------------------------------------------------------

--
-- Структура таблицы `document_cranes`
--

CREATE TABLE `document_cranes` (
                                   `id` int NOT NULL,
                                   `id_fitting` int NOT NULL,
                                   `document_url` varchar(1023) COLLATE utf8mb4_general_ci NOT NULL,
                                   `name` varchar(511) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `document_cranes`
--

INSERT INTO `document_cranes` (`id`, `id_fitting`, `document_url`, `name`) VALUES
                                                                               (8, 6, 'http://localhost/portal_vkazym/app/assets/crane_data/между Ямбург-Елец 2 и Ямбург-Зап.граница/Линейный_Стояк отбора газа_853_853-1/documents/PDF.pdf', 'PDF.pdf'),
                                                                               (9, 9, 'http://localhost/portal_vkazym/app/assets/crane_data/Уренгой-Ужгород/Линейный_на ЛК_538_538-1.3/documents/car.png', 'car.png'),
                                                                               (10, 9, 'http://localhost/portal_vkazym/app/assets/crane_data/Уренгой-Ужгород/Линейный_на ЛК_538_538-1.3/documents/PDF.pdf', 'PDF.pdf');

-- --------------------------------------------------------

--
-- Структура таблицы `drives`
--

CREATE TABLE `drives` (
                          `id` int NOT NULL,
                          `type_drive` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                          `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                          `factory_number` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                          `liquid` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                          `year_commission` year NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `drives`
--

INSERT INTO `drives` (`id`, `type_drive`, `company`, `factory_number`, `liquid`, `year_commission`) VALUES
                                                                                                        (1, 'Пневмогидравлический', 'АЗТПА', NULL, NULL, '1984'),
                                                                                                        (3, 'Пневмогидравлический', 'Волгограднефтемаш', '587', 'ПМС-20 Югра', '2005'),
                                                                                                        (4, 'Пневмогидравлический', 'Волгограднефтемаш', NULL, 'ПМС-20 Югра', '2005'),
                                                                                                        (5, 'Пневмогидравлический', 'Уралхиммаш', '7679', 'ПМС-20 Югра', '1986'),
                                                                                                        (6, 'Пневмогидравлический', 'Волгограднефтемаш', '2545', 'ПМС-20 Югра', '2007'),
                                                                                                        (7, 'Пневмогидравлический', 'Грове', NULL, 'ПМС-20 Югра', '1984'),
                                                                                                        (8, 'Пневмогидравлический', 'Грове', NULL, 'ПМС-20 Югра', '1984'),
                                                                                                        (9, 'Пневмогидравлический', 'Грове', NULL, 'ПМС-20 Югра', '1984'),
                                                                                                        (10, 'Пневмогидравлический', 'Дзержинскхиммаш', '9520', 'ПМС-20 Югра', '1986');

-- --------------------------------------------------------

--
-- Структура таблицы `executions`
--

CREATE TABLE `executions` (
                              `id` int NOT NULL,
                              `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `executions`
--

INSERT INTO `executions` (`id`, `name`) VALUES
    (1, 'Подземное');

-- --------------------------------------------------------

--
-- Структура таблицы `fittings`
--

CREATE TABLE `fittings` (
                            `id` int NOT NULL,
                            `name_highways` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `crane_class` varchar(31) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `name_crane` varchar(31) COLLATE utf8mb4_general_ci NOT NULL,
                            `location_crane` int NOT NULL,
                            `technical_number` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `year_manufacture` year NOT NULL,
                            `factory_number` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                            `Dn` int NOT NULL,
                            `id_malfunction` int DEFAULT NULL,
                            `plan_replacement` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                            `IUS` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `unification_crane` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `type_reinforcement` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `pressure` int NOT NULL,
                            `execution` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `year_commission` year NOT NULL,
                            `id_drive` int NOT NULL,
                            `classification_installation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `fittings`
--

INSERT INTO `fittings` (`id`, `name_highways`, `crane_class`, `name_crane`, `location_crane`, `technical_number`, `company`, `year_manufacture`, `factory_number`, `Dn`, `id_malfunction`, `plan_replacement`, `IUS`, `unification_crane`, `type_reinforcement`, `pressure`, `execution`, `year_commission`, `id_drive`, `classification_installation`) VALUES
                                                                                                                                                                                                                                                                                                                                                            (6, 'между Ямбург-Елец 2 и Ямбург-Зап.граница', 'Линейный', 'Стояк отбора газа', 853, '853-1', 'АЗТПА', '1984', '2545', 300, 6, NULL, '409', 'КЦ', 'Шаровой', 80, 'Подземное', '1985', 1, NULL),
                                                                                                                                                                                                                                                                                                                                                            (7, 'Уренгой-Центр 2', 'Линейный', 'на ЛК', 539, '539-3.2', 'Волгограднефтемаш', '2003', '852', 300, 7, NULL, '409', '537 КрУ', 'Шаровой', 80, 'Подземное', '2005', 4, NULL),
                                                                                                                                                                                                                                                                                                                                                            (8, 'Уренгой-Центр 2', 'Линейный', 'на ЛК', 539, '539-3.3', 'Волгограднефтемаш', '2003', '857', 300, 8, NULL, '411', '537 КрУ', 'Шаровой', 80, 'Подземное', '2005', 3, NULL),
                                                                                                                                                                                                                                                                                                                                                            (9, 'Уренгой-Ужгород', 'Линейный', 'на ЛК', 538, '538-1.3', 'Грове', '1983', NULL, 300, 9, NULL, '411', '537 КрУ', 'Шаровой', 80, 'Подземное', '1984', 7, NULL);

--
-- Триггеры `fittings`
--
DELIMITER $$
CREATE TRIGGER `after_insert_main_n` BEFORE INSERT ON `fittings` FOR EACH ROW BEGIN
    INSERT INTO malfunctions () VALUES ();

    SET @new_id_malfunction = LAST_INSERT_ID();

    SET NEW.id_malfunction = @new_id_malfunction;
END
    $$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `highways`
--

CREATE TABLE `highways` (
                            `id` int NOT NULL,
                            `name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                            `lpumg` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `highways`
--

INSERT INTO `highways` (`id`, `name`, `lpumg`) VALUES
                                                   (49, 'Уренгой-Ужгород', 'Верхнеказымское'),
                                                   (50, 'Уренгой-Центр 1', 'Верхнеказымское'),
                                                   (61, 'Уренгой-Центр 2', 'Верхнеказымское'),
                                                   (73, 'Ямбург-Елец 1', 'Верхнеказымское'),
                                                   (74, 'Ямбург-Елец 2', 'Верхнеказымское'),
                                                   (75, 'Ямбург-Зап.граница', 'Верхнеказымское'),
                                                   (76, 'Ямбург-Тула 1', 'Верхнеказымское'),
                                                   (77, 'Ямбург-Тула 2', 'Верхнеказымское'),
                                                   (79, 'Ямбург-Поволжье', 'Верхнеказымское'),
                                                   (80, 'СРТО-Урал', 'Верхнеказымское'),
                                                   (91, 'между Уренгой-Ужгород и Уренгой-Центр 1', 'Верхнеказымское'),
                                                   (92, 'между Уренгой-Центр 1 и Уренгой-Центр 2', 'Верхнеказымское'),
                                                   (93, 'между Уренгой-Центр 2 и Ямбург-Елец 1', 'Верхнеказымское'),
                                                   (94, 'между Ямбург-Елец 1 и Ямбург-Елец 2', 'Верхнеказымское'),
                                                   (95, 'между Ямбург-Елец 2 и Ямбург-Зап.граница', 'Верхнеказымское'),
                                                   (96, 'между Ямбург-Зап.граница и Ямбург-Тула 1', 'Верхнеказымское'),
                                                   (97, 'между Ямбург-Тула 1 и Ямбург-Тула 2', 'Верхнеказымское'),
                                                   (98, 'между Ямбург-Тула 2 и Ямбург-Поволжье', 'Верхнеказымское'),
                                                   (99, 'между Ямбург-Поволжье и СРТО-Урал', 'Верхнеказымское');

-- --------------------------------------------------------

--
-- Структура таблицы `ius`
--

CREATE TABLE `ius` (
                       `id` int NOT NULL,
                       `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `ius`
--

INSERT INTO `ius` (`id`, `name`) VALUES
                                     (2, '409'),
                                     (3, '411'),
                                     (1, '412');

-- --------------------------------------------------------

--
-- Структура таблицы `liquids`
--

CREATE TABLE `liquids` (
                           `id` int NOT NULL,
                           `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `liquids`
--

INSERT INTO `liquids` (`id`, `name`) VALUES
    (1, 'ПМС-20 Югра');

-- --------------------------------------------------------

--
-- Структура таблицы `list_act_leakages`
--

CREATE TABLE `list_act_leakages` (
                                     `id` int NOT NULL,
                                     `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_act_leakages`
--

INSERT INTO `list_act_leakages` (`id`, `name`) VALUES
                                                   (1, 'нет'),
                                                   (2, 'есть'),
                                                   (3, 'Ввести свое значение');

-- --------------------------------------------------------

--
-- Структура таблицы `list_classification_installations`
--

CREATE TABLE `list_classification_installations` (
                                                     `id` int NOT NULL,
                                                     `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_classification_installations`
--

INSERT INTO `list_classification_installations` (`id`, `name`) VALUES
                                                                   (1, 'Камера запуска'),
                                                                   (2, 'Камера приема');

-- --------------------------------------------------------

--
-- Структура таблицы `list_general_descriptions`
--

CREATE TABLE `list_general_descriptions` (
                                             `id` int NOT NULL,
                                             `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_general_descriptions`
--

INSERT INTO `list_general_descriptions` (`id`, `name`) VALUES
                                                           (2, 'Ввести свое значение'),
                                                           (3, 'Неполадок не обнаружено '),
                                                           (1, 'Требует замену');

-- --------------------------------------------------------

--
-- Структура таблицы `list_leakages`
--

CREATE TABLE `list_leakages` (
                                 `id` int NOT NULL,
                                 `name` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_leakages`
--

INSERT INTO `list_leakages` (`id`, `name`) VALUES
                                               (1, 0),
                                               (2, 1),
                                               (3, 2),
                                               (4, 3),
                                               (5, 4),
                                               (6, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `list_results`
--

CREATE TABLE `list_results` (
                                `id` int NOT NULL,
                                `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                `description` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_results`
--

INSERT INTO `list_results` (`id`, `name`, `description`) VALUES
                                                             (1, '0', 'Неработающие краны'),
                                                             (2, '1', 'Работающие краны'),
                                                             (3, '2', 'Дефективные краны');

-- --------------------------------------------------------

--
-- Структура таблицы `list_strapping`
--

CREATE TABLE `list_strapping` (
                                  `id` int NOT NULL,
                                  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_strapping`
--

INSERT INTO `list_strapping` (`id`, `name`) VALUES
                                                (1, 'В наличии'),
                                                (2, 'Нет в наличии');

-- --------------------------------------------------------

--
-- Структура таблицы `list_tightness`
--

CREATE TABLE `list_tightness` (
                                  `id` int NOT NULL,
                                  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `list_tightness`
--

INSERT INTO `list_tightness` (`id`, `name`) VALUES
                                                (1, 'Герметичен'),
                                                (2, 'Негерметичен');

-- --------------------------------------------------------

--
-- Структура таблицы `location`
--

CREATE TABLE `location` (
                            `id` int NOT NULL,
                            `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `location`
--

INSERT INTO `location` (`id`, `name`) VALUES
                                          (4, 'Германия'),
                                          (3, 'Италия'),
                                          (6, 'Казахстан'),
                                          (1, 'Россия'),
                                          (7, 'Украина'),
                                          (5, 'Чехия'),
                                          (2, 'Япония');

-- --------------------------------------------------------

--
-- Структура таблицы `lpumgs`
--

CREATE TABLE `lpumgs` (
                          `id` int NOT NULL,
                          `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `lpumgs`
--

INSERT INTO `lpumgs` (`id`, `name`) VALUES
                                        (2, 'temp'),
                                        (1, 'Верхнеказымское');

-- --------------------------------------------------------

--
-- Структура таблицы `malfunctions`
--

CREATE TABLE `malfunctions` (
                                `id` int NOT NULL,
                                `general_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                `tightness` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                `leakage` int DEFAULT NULL,
                                `act_leakage` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                `drainage` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                `packing_pipelines` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
                                `result` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `malfunctions`
--

INSERT INTO `malfunctions` (`id`, `general_description`, `tightness`, `leakage`, `act_leakage`, `drainage`, `packing_pipelines`, `result`) VALUES
                                                                                                                                               (6, 'Требует замену', 'Негерметичен', 4, 'АКТ', 'В наличии', 'В наличии', 0),
                                                                                                                                               (7, 'Слома, сломан, сломан', 'Герметичен', 0, 'нет', 'В наличии', 'В наличии', 1),
                                                                                                                                               (8, NULL, NULL, NULL, NULL, NULL, NULL, 1),
                                                                                                                                               (9, 'Требует замену', 'Негерметичен', 5, 'нет', 'Нет в наличии', 'Нет в наличии', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `name_cranes`
--

CREATE TABLE `name_cranes` (
                               `id` int NOT NULL,
                               `name` varchar(31) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `name_cranes`
--

INSERT INTO `name_cranes` (`id`, `name`) VALUES
                                             (1, 'на ЛК'),
                                             (2, 'на перемычке'),
                                             (4, 'Обводной'),
                                             (6, 'Отсечной'),
                                             (7, 'Свечной'),
                                             (8, 'Стояк отбора газа');

-- --------------------------------------------------------

--
-- Структура таблицы `passwords`
--

CREATE TABLE `passwords` (
                             `id` int NOT NULL,
                             `user_id` int NOT NULL,
                             `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `passwords`
--

INSERT INTO `passwords` (`id`, `user_id`, `password`) VALUES
                                                          (1, 29, '$2y$10$IjRH4FqokbP7dokRHQ4iDOK/3jPxHgOQwOfhOGkPqCVWS9swbMnz6'),
                                                          (2, 30, '$2y$10$FhWgc/3WP6G1/2KyvyOlY.g7zOBclp/yVZf9bqEJ/KeT6692FR6mO'),
                                                          (3, 1, '$2y$10$35.yVnFrsE9VXxcIWyziXuPLTxY8jaPKbc3TthHEQ7.aX8AbCpVky'),
                                                          (4, 2, '$2y$10$35.yVnFrsE9VXxcIWyziXuPLTxY8jaPKbc3TthHEQ7.aX8AbCpVky'),
                                                          (5, 3, '$2y$10$Abw38N4RumrLRGEkFtz0rOvR0L39D42gCNp6X7sy6M.KZqP43EWnq'),
                                                          (6, 4, '$2y$10$1HBaOo06MRWeBCMe8BlfzuKuN36AVmzr65f4ZjLVusuAPdSy.ZNUu'),
                                                          (7, 5, '$2y$10$ph2h/Y77Z9bzxB1ZF2Oy8OplNRmD4nMIBDV64N5s7xJTvvjrcQ1I.'),
                                                          (8, 6, '$2y$10$UgHWB.Flt/nAD7ChK9bP4eDgqMUETpBuQdSQk10Bt7yXlFmkjLYo.'),
                                                          (9, 7, '$2y$10$K2IS/sL02aTkKg810UGMEeBUKo438Qah2tCTiBs6E7qt1YBWJV8rK'),
                                                          (10, 8, '$2y$10$VNaMm0xeMOc1YK6Bfobl1OmT35/BPP0e/.Sxo0oDY75GPgl1Xryfy'),
                                                          (11, 9, '$2y$10$uXxWard7vwbZJW1rc6SEhuDtwsrPDfAyFWiXfQUXb5uGCceIaPm2e'),
                                                          (12, 10, '$2y$10$d483T/CxMDPUPaOipnpYneEgAGJLQxsyctMW84qmHBhE9fVvhz9rO'),
                                                          (13, 10, '$2y$10$3dGmTFEQN1G6J4o8oXa21uzt6v7L25eO/4e08ugpZs0c6FsqnP2Uu'),
                                                          (14, 12, '$2y$10$xKN.tTZDDTHp7JC6hYRUAuo3KHLnif9wGODV40NkSWw2EV81tZS0y'),
                                                          (15, 13, '$2y$10$KvdehAHAqfEDPC6LD1TgYuDr3YpLd23h2JDunSbU6QIBmz3tbkhHC'),
                                                          (16, 14, '$2y$10$//AuBTk7bZDrcNNkGyLLZuESbdZYS42BwJPoHvMsUxhwSH/7o6dlu'),
                                                          (17, 15, '$2y$10$kuIMHOCv9RSIMJVvmc054OTGVDjIorrASiMy2.uG7/xq13oJ5pU7y'),
                                                          (18, 16, '$2y$10$IbhVNW3tTjOpOOY5H1yRw.GEDYYBI1dSdQQdG6FwZ/CRghyUR8lG2'),
                                                          (19, 17, '$2y$10$86tevaRXnd0sQO96hTy6BO66Ybr7WV/ObSvfe0JoZgAIgXvBC9yNe'),
                                                          (20, 18, '$2y$10$w9VJ1cr9W8l6pouc8RoFZekB94is/BP6C88HFQomj9.lz9cOnFVM2'),
                                                          (21, 19, '$2y$10$OPK8drX3iEm7Z0S0M5aTb.3uyH1DkPY6m8GNTTYJuGzt7JLdDrOUS'),
                                                          (22, 20, '$2y$10$wDkJ.DKm3FuMGFxXDLmKK.HpP2sUI0lfryD5EhFbE/5PpGZgdYp/O'),
                                                          (23, 21, '$2y$10$OifF9VbxCF/.NXaXdYLlqO73EYCsLVXfaPqYAQ0p.ASqTKkTSkbmu'),
                                                          (24, 22, '$2y$10$FhGDUNnG5NKIGftX9pRKXeDKC6po0WQM/ObkAYZBW2/QH6mHiy.CK'),
                                                          (25, 23, '$2y$10$pqEkF6h9n4AjQt2SzoVRD.QNCvIAn1G6e.ywVtK9btWDFClMuDQv6'),
                                                          (26, 24, '$2y$10$3g5kSGJjbiB7NnSDO3IKcO1aw3rH8y.YPd6Eh.Rd/xLR5hfBzZ7XW'),
                                                          (27, 25, '$2y$10$4ajvUGO3EepMbD5Cwe3sp.tTYwitFWp804ATMpnlrUxhn1iDAe.H2'),
                                                          (28, 26, '$2y$10$wJHaaQYC/3m7QKUAqsCG2e0mtO5Q4Pt2MFgW3NLFjyRXIS7f1dXUi'),
                                                          (29, 27, '$2y$10$IzfnTtrtFnqEDYdpDcZu1.HHg5VaZFQm.vpXvELu.qcdp8L53B2dK'),
                                                          (30, 31, '$2y$10$sg1cngrBCveuMRIXIDor7e8956khQWLv2xdwQUqv2h2cFTySDrohO'),
                                                          (31, 32, '$2y$10$8xSYPFNFb7loLPKEWOdUzOXQykxq7S.Wo35Od8k5am4JB9t3328t.');

-- --------------------------------------------------------

--
-- Структура таблицы `photo_cranes`
--

CREATE TABLE `photo_cranes` (
                                `id` int NOT NULL,
                                `id_fitting` int NOT NULL,
                                `photo_url` varchar(1023) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                `name` varchar(511) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `photo_cranes`
--

INSERT INTO `photo_cranes` (`id`, `id_fitting`, `photo_url`, `name`) VALUES
                                                                         (96, 6, 'http://localhost/portal_vkazym/app/assets/crane_data/между Ямбург-Елец 2 и Ямбург-Зап.граница/Линейный_Стояк отбора газа_853_853-1/img/crane_img_6_2024-08-09T065335.png', 'downArrow.png'),
                                                                         (97, 6, 'http://localhost/portal_vkazym/app/assets/crane_data/между Ямбург-Елец 2 и Ямбург-Зап.граница/Линейный_Стояк отбора газа_853_853-1/img/crane_img_6_2024-08-09T065337.png', 'car.png'),
                                                                         (98, 7, 'http://localhost/portal_vkazym/app/assets/crane_data/Уренгой-Центр 2/Линейный_на ЛК_539_539-3.2/img/crane_img_7_2024-08-09T065420.png', 'кран.png'),
                                                                         (99, 7, 'http://localhost/portal_vkazym/app/assets/crane_data/Уренгой-Центр 2/Линейный_на ЛК_539_539-3.2/img/crane_img_7_2024-08-09T065424.png', 'save.png'),
                                                                         (100, 9, 'http://localhost/portal_vkazym/app/assets/crane_data/Уренгой-Ужгород/Линейный_на ЛК_538_538-1.3/img/crane_img_9_2024-08-09T065434.jpeg', 'noimage.jpeg'),
                                                                         (101, 9, 'http://localhost/portal_vkazym/app/assets/crane_data/Уренгой-Ужгород/Линейный_на ЛК_538_538-1.3/img/crane_img_9_2024-08-09T065436.png', 'downArrow.png');

-- --------------------------------------------------------

--
-- Структура таблицы `privileges`
--

CREATE TABLE `privileges` (
                              `id` int NOT NULL,
                              `work_position` int NOT NULL DEFAULT '0',
                              `transcript` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `privileges`
--

INSERT INTO `privileges` (`id`, `work_position`, `transcript`) VALUES
                                                                   (1, 0, 'Пользователь(только просмотр)'),
                                                                   (2, 1, 'Админ'),
                                                                   (3, 2, 'Младший техник(заказ техники)'),
                                                                   (4, 3, 'Старший техник(заказ/подтверждение техники)'),
                                                                   (5, 4, 'Сотрудник техподдержки(просмотр/ответ на заявки)'),
                                                                   (6, 5, 'Мл. техник и сотрудник техподдержки(заказ техники и просмотр/ответ на заявки)'),
                                                                   (7, 6, 'Ст. техник и сотрудник техподдержки(заказ/подтверждение техники и просмотр/ответ на заявки)');

-- --------------------------------------------------------

--
-- Структура таблицы `responses`
--

CREATE TABLE `responses` (
                             `id` int NOT NULL,
                             `application_id` int NOT NULL,
                             `user_id` int NOT NULL,
                             `response` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                             `status` tinyint(1) NOT NULL,
                             `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `responses`
--

INSERT INTO `responses` (`id`, `application_id`, `user_id`, `response`, `status`, `date`) VALUES
                                                                                              (26, 18, 24, '', 1, '2024-07-23 14:28:51'),
                                                                                              (27, 17, 24, '', 1, '2024-07-23 14:28:54'),
                                                                                              (28, 16, 24, '', 1, '2024-07-23 14:28:57'),
                                                                                              (29, 15, 24, '', 1, '2024-07-23 14:28:59'),
                                                                                              (30, 14, 24, '', 1, '2024-07-23 14:29:02'),
                                                                                              (31, 13, 24, '', 1, '2024-07-23 14:29:04'),
                                                                                              (32, 12, 24, '', 1, '2024-07-23 14:29:07'),
                                                                                              (33, 18, 27, 'ЗАявка выполнена', 2, '2024-07-23 14:30:09'),
                                                                                              (34, 17, 24, '', 2, '2024-07-23 14:31:41'),
                                                                                              (35, 16, 24, '', 2, '2024-07-23 14:36:04'),
                                                                                              (36, 15, 24, '........!', 3, '2024-07-23 15:35:35'),
                                                                                              (37, 19, 27, '', 1, '2024-07-24 09:29:52'),
                                                                                              (38, 19, 24, 'Вы', 2, '2024-07-24 09:31:08'),
                                                                                              (39, 20, 24, 'sdccdcccccccccc', 1, '2024-07-24 11:09:36'),
                                                                                              (40, 20, 24, 'vvvvvvvvvvvvvvvvvvvvvvv', 3, '2024-07-24 11:09:49'),
                                                                                              (41, 2, 24, '', 1, '2024-07-25 14:42:04'),
                                                                                              (42, 2, 24, 'hfkjdf', 2, '2024-07-25 14:45:45'),
                                                                                              (43, 11, 24, '', 1, '2024-07-25 15:12:00'),
                                                                                              (44, 13, 24, '', 2, '2024-07-25 16:12:23'),
                                                                                              (45, 24, 27, '', 1, '2024-07-29 11:39:21'),
                                                                                              (46, 7, 29, '', 2, '2024-07-29 14:37:38'),
                                                                                              (47, 9, 29, '', 1, '2024-07-29 14:37:46');

--
-- Триггеры `responses`
--
DELIMITER $$
CREATE TRIGGER `after_insert_responses` AFTER INSERT ON `responses` FOR EACH ROW BEGIN
    UPDATE applications
    SET status = NEW.status
    WHERE id = NEW.application_id;
END
    $$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_application_status_on_delete` AFTER DELETE ON `responses` FOR EACH ROW BEGIN
    -- Обновляем статус в таблице applications на 0 для удалённой записи
    UPDATE applications
    SET status = 0
    WHERE id = OLD.application_id;
END
    $$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `responsible_person`
--

CREATE TABLE `responsible_person` (
                                      `id` int NOT NULL,
                                      `lastname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                      `firstname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                      `patronymic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                                      `service_id` int NOT NULL,
                                      `phone_number` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `responsible_person`
--

INSERT INTO `responsible_person` (`id`, `lastname`, `firstname`, `patronymic`, `service_id`, `phone_number`) VALUES
                                                                                                                 (1, 'Б', 'Борис', 'Борисович', 4, '00-001'),
                                                                                                                 (4, 'С', 'Юрий', 'Владимирович', 8, '89220000000'),
                                                                                                                 (6, 'П2', 'Иван', 'Иванович2', 8, '89876543210'),
                                                                                                                 (7, 'Т3', 'Василий', 'Васильевич', 8, '89876543210'),
                                                                                                                 (8, 'ПП', 'ИВАН', 'Иванович', 8, '89876543210');

-- --------------------------------------------------------

--
-- Структура таблицы `route`
--

CREATE TABLE `route` (
                         `id` int NOT NULL,
                         `route_to` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                         `service_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `route`
--

INSERT INTO `route` (`id`, `route_to`, `service_id`) VALUES
                                                         (1, 'ДЛО-1', 8),
                                                         (2, 'ДЛО-2', 8),
                                                         (3, 'Жил поселок', 12),
                                                         (5, 'ДЛО-4', 8),
                                                         (6, 'ДЛО-5', 8),
                                                         (7, 'ДЛО-6', 8),
                                                         (8, 'ДЛО-8', 8),
                                                         (9, 'ДЛО-9', 8),
                                                         (10, 'ДЛО-10', 8),
                                                         (11, 'ДЛО-26', 8),
                                                         (12, 'СКГ-7', 4),
                                                         (13, 'СКГ-5', 4),
                                                         (14, 'ы', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `services`
--

CREATE TABLE `services` (
                            `id` int NOT NULL,
                            `service` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `services`
--

INSERT INTO `services` (`id`, `service`) VALUES
                                             (3, 'ДС'),
                                             (4, 'ГКС'),
                                             (5, 'ОТ'),
                                             (6, 'ЭВС'),
                                             (7, 'ЛЭС'),
                                             (8, 'АиМО'),
                                             (9, 'Связь'),
                                             (10, 'ВПО '),
                                             (11, 'СХМТРиСО'),
                                             (12, 'Общежитие'),
                                             (13, 'СЗК'),
                                             (14, 'КСК'),
                                             (15, 'ХАЛ'),
                                             (16, 'Диспетчер по транспорту'),
                                             (17, 'РиФИ'),
                                             (18, 'ГЗИ');

-- --------------------------------------------------------

--
-- Структура таблицы `technique`
--

CREATE TABLE `technique` (
                             `id_technique` int NOT NULL,
                             `name_technique` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                             `id_type_of_techniques` int NOT NULL,
                             `state_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
                             `faulty` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `technique`
--

INSERT INTO `technique` (`id_technique`, `name_technique`, `id_type_of_techniques`, `state_number`, `faulty`) VALUES
                                                                                                                  (5, 'ВАЗ-00', 1, 'к123кк 186', 0),
                                                                                                                  (6, '11', 1, 'к123кк 186', 0),
                                                                                                                  (7, 'Вахтовый автобус (газовый), НЕФАЗ-4208-41', 9, 'В596ОХ 186', 0),
                                                                                                                  (8, 'Вахтовый автобус (газовый), НЕФАЗ-4208-41', 9, 'В868ВС 186', 0),
                                                                                                                  (9, 'Вахтовый автобус (газовый), НЕФАЗ-4208-41 ДЕЖУРНЫЙ', 9, 'А426УС 186', 0),
                                                                                                                  (10, 'Бортовая (газовая) КАМАЗ-43118', 5, 'В822ВС 186', 0),
                                                                                                                  (11, 'Бортовая-кислородка (газовая) КАМАЗ-43118', 5, 'В829ВС 186', 0),
                                                                                                                  (12, 'Автокран проходимый 25т (газовый) КАМАЗ-43118-37', 3, 'А438УС 186', 0),
                                                                                                                  (13, 'Автокран проходимый 16т (дизель) УРАЛ-5557', 3, 'К348ВМ 86', 1),
                                                                                                                  (14, 'Автокран шоссейный 25т (дизель) КАМАЗ-43118-37', 3, 'Х485СА 86', 0),
                                                                                                                  (15, 'Грузопассажирский КАМАЗ-КМУ (газовый)', 28, 'В649ТУ 86', 0),
                                                                                                                  (16, 'Грузопассажирский КАМАЗ-КМУ (дизель)', 28, 'б/н', 1),
                                                                                                                  (17, 'Грузопассажирский УАЗ-29893 (буханка)', 28, 'Н626АМ 186', 0),
                                                                                                                  (18, 'Грузопассажирский ГАЗ-2705', 28, 'А895УС 186', 0),
                                                                                                                  (19, 'Самосвал УРАЛ-63701', 17, 'А959УС 186', 0),
                                                                                                                  (20, 'Самосвал УРАЛ-63701', 17, 'б/н', 1),
                                                                                                                  (21, 'Самосвал КАМАЗ', 17, 'б/н', 0),
                                                                                                                  (22, 'Монтажный подъемник КАМАЗ-43114-32', 13, 'А407УС 186', 0),
                                                                                                                  (23, 'Илососная КАМАЗ-65115', 11, 'А927УС 186', 0),
                                                                                                                  (24, 'УМП-350 ЗИЛ-131', 21, 'У799ВМ 89', 0),
                                                                                                                  (25, 'ППУА-1600/100 КАМАЗ-53228', 16, 'Х798ТР 86', 0),
                                                                                                                  (26, 'АМКОДОР-342С', 7, '9260ХЕ 86', 0),
                                                                                                                  (27, 'Экскаватор Хитачи ЕХ-330', 23, '2913УМ 86', 0),
                                                                                                                  (28, 'Экскаватор ЕК-270', 23, '6795НА 86', 0),
                                                                                                                  (29, 'Экскаватор колесный ЕК-18', 24, '1545ХР 86', 0),
                                                                                                                  (30, 'Экскаватор колесный ЭО-2626А (петушок)', 24, '9261ХЕ 86', 0),
                                                                                                                  (31, 'Гусеничный транспортер ГАЗ-34031', 10, '7413МА 86', 0),
                                                                                                                  (32, 'Гусеничный транспортер ГАЗ-34031 (Сосновский)', 10, 'б/н', 0),
                                                                                                                  (33, 'Гусеничный транспортер ГТТ', 10, '3390ХМ 86', 0),
                                                                                                                  (34, 'Бульдозер Б-10.1111-1Е', 6, '7409МА 86', 0),
                                                                                                                  (35, 'Бульдозер Т-11.02ЯМБР (Четра)', 6, '2933УМ 86', 0),
                                                                                                                  (36, 'Бульдозер ДТ-75', 6, '5631ХМ 86', 0),
                                                                                                                  (37, 'Ямобур Т-35.01 ЯБР-1', 8, '5345ХМ 86', 0),
                                                                                                                  (38, 'Трубоукладчик ТГ-503Я', 19, '7411МА 86', 0),
                                                                                                                  (39, 'Трубоукладчик (стороннего ЛПУ)', 19, 'б/н', 0),
                                                                                                                  (40, 'МОАЗ-40489-23', 7, '8791ХЕ 86', 0),
                                                                                                                  (41, 'Легковой автомобиль УАЗ Патриот', 12, 'В893ВС 186', 0),
                                                                                                                  (42, 'Легковой автомобиль Тойота', 12, 'В141НО 186', 0),
                                                                                                                  (43, 'Аварийка (дизель) КАМАЗ-431140', 22, 'Х447МО 86', 0),
                                                                                                                  (44, 'Аварийка (дизель) КАМАЗ-43101А', 22, 'М276МВ 86', 0),
                                                                                                                  (45, 'Автобус НЕФАЗ-5299-11', 1, 'О966УА 86', 0),
                                                                                                                  (46, 'Автобус КАВЗ-4238', 1, 'А026ТМ 186', 0),
                                                                                                                  (47, 'УРАЛ (трал)', 18, 'б/н', 0),
                                                                                                                  (48, 'Автогрейдер ДЗ-98', 2, 'б/н', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `technique_order`
--

CREATE TABLE `technique_order` (
                                   `id` int NOT NULL,
                                   `user_id` int NOT NULL,
                                   `service_id` int NOT NULL,
                                   `technique_id` int NOT NULL,
                                   `route_id` int NOT NULL,
                                   `work_activity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                                   `responsible_person_id` int NOT NULL,
                                   `date_from` date NOT NULL,
                                   `date_to` date NOT NULL,
                                   `time_from` time NOT NULL,
                                   `time_to` time NOT NULL,
                                   `datetime_from` datetime DEFAULT NULL,
                                   `datetime_to` datetime DEFAULT NULL,
                                   `shift` int DEFAULT NULL,
                                   `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
                                   `status` tinyint NOT NULL DEFAULT '0',
                                   `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `technique_order`
--

INSERT INTO `technique_order` (`id`, `user_id`, `service_id`, `technique_id`, `route_id`, `work_activity`, `responsible_person_id`, `date_from`, `date_to`, `time_from`, `time_to`, `datetime_from`, `datetime_to`, `shift`, `remark`, `status`, `created_at`) VALUES
                                                                                                                                                                                                                                                                   (1, 29, 8, 44, 5, 'виды работтттт', 1, '2024-07-03', '2024-07-04', '20:00:47', '23:00:00', '2024-07-03 20:00:47', '2024-07-04 23:00:00', NULL, 'нет примечания', 1, '2024-07-18 20:47:06'),
                                                                                                                                                                                                                                                                   (2, 29, 8, 6, 6, NULL, 4, '2024-07-02', '2024-07-05', '08:00:00', '20:00:00', '2024-07-02 08:00:00', '2024-07-05 20:00:00', 0, NULL, 2, '2024-07-20 13:47:36'),
                                                                                                                                                                                                                                                                   (3, 29, 8, 8, 6, NULL, 1, '2024-07-02', '2024-07-05', '08:00:00', '20:00:00', '2024-07-02 08:00:00', '2024-07-05 20:00:00', 0, NULL, 1, '2024-07-20 13:47:36'),
                                                                                                                                                                                                                                                                   (4, 11, 8, 7, 6, NULL, 4, '2024-07-03', '2024-07-02', '20:00:00', '08:00:00', '2024-07-03 20:00:00', '2024-07-02 08:00:00', 1, NULL, 1, '2024-07-22 08:16:07'),
                                                                                                                                                                                                                                                                   (5, 11, 8, 5, 6, NULL, 6, '2024-07-03', '2024-07-02', '20:00:00', '08:00:00', '2024-07-03 20:00:00', '2024-07-02 08:00:00', 1, NULL, 1, '2024-07-22 08:16:07'),
                                                                                                                                                                                                                                                                   (6, 11, 8, 12, 6, NULL, 7, '2024-07-03', '2024-07-02', '20:00:00', '08:00:00', '2024-07-03 20:00:00', '2024-07-02 08:00:00', 1, NULL, 1, '2024-07-22 08:16:07'),
                                                                                                                                                                                                                                                                   (7, 29, 8, 9, 11, NULL, 4, '2024-07-29', '2024-07-29', '08:00:00', '20:00:00', '2024-07-29 08:00:00', '2024-07-29 20:00:00', 0, NULL, 1, '2024-07-29 16:06:37'),
                                                                                                                                                                                                                                                                   (14, 32, 4, 7, 12, NULL, 1, '2024-07-29', '2024-07-29', '18:14:00', '20:00:00', '2024-07-29 18:14:00', '2024-07-29 20:00:00', 0, NULL, 0, '2024-07-29 17:14:36'),
                                                                                                                                                                                                                                                                   (15, 32, 4, 6, 12, NULL, 1, '2024-07-29', '2024-07-29', '18:14:00', '20:00:00', '2024-07-29 18:14:00', '2024-07-29 20:00:00', 0, NULL, 0, '2024-07-29 17:14:37'),
                                                                                                                                                                                                                                                                   (16, 32, 4, 22, 12, NULL, 1, '2024-07-29', '2024-07-29', '18:14:00', '20:00:00', '2024-07-29 18:14:00', '2024-07-29 20:00:00', 0, NULL, 0, '2024-07-29 17:14:37'),
                                                                                                                                                                                                                                                                   (33, 29, 8, 5, 1, 'Тест1', 6, '2024-07-30', '2024-07-31', '20:00:00', '08:00:00', '2024-07-30 20:00:00', '2024-07-31 08:00:00', 1, 'Тест1', 0, '2024-07-30 09:37:47'),
                                                                                                                                                                                                                                                                   (34, 29, 8, 8, 1, '', 7, '2024-07-30', '2024-07-31', '20:00:00', '08:00:00', '2024-07-30 20:00:00', '2024-07-31 08:00:00', 1, '', 0, '2024-07-30 09:37:47'),
                                                                                                                                                                                                                                                                   (36, 29, 8, 13, 1, 'Тест5', 6, '2024-07-30', '2024-07-31', '20:00:00', '08:00:00', '2024-07-30 20:00:00', '2024-07-31 08:00:00', 1, 'Тест5', 1, '2024-07-30 09:39:15'),
                                                                                                                                                                                                                                                                   (37, 29, 8, 10, 1, '', 7, '2024-07-30', '2024-07-31', '20:00:00', '08:00:00', '2024-07-30 20:00:00', '2024-07-31 08:00:00', 1, '', 1, '2024-07-30 09:39:15'),
                                                                                                                                                                                                                                                                   (38, 29, 8, 6, 1, 'Тест7', 4, '2024-07-30', '2024-07-31', '20:00:00', '08:00:00', '2024-07-30 20:00:00', '2024-07-31 08:00:00', 1, '', 2, '2024-07-30 09:39:15'),
                                                                                                                                                                                                                                                                   (39, 29, 8, 22, 1, 'Тест8', 6, '2024-07-30', '2024-07-31', '20:00:00', '08:00:00', '2024-07-30 20:00:00', '2024-07-31 08:00:00', 1, 'Тест8', 1, '2024-07-30 09:39:15'),
                                                                                                                                                                                                                                                                   (40, 25, 8, 5, 2, 'нет вида работнет вида работнет вида работнет вида работнет вида работнет вида работнет вида работнет вида работнет вида работ', 4, '2024-07-30', '2024-07-30', '13:15:00', '15:00:00', '2024-07-30 13:15:00', '2024-07-30 15:00:00', 0, 'ремарка ремарка ремарка ремарка ремарка ремарка ремарка ремарка ремарка ремарка ', 2, '2024-07-30 09:49:36'),
                                                                                                                                                                                                                                                                   (41, 25, 8, 7, 2, '', 6, '2024-07-30', '2024-07-30', '13:15:00', '15:00:00', '2024-07-30 13:15:00', '2024-07-30 15:00:00', 0, '-----', 2, '2024-07-30 09:49:36'),
                                                                                                                                                                                                                                                                   (42, 29, 8, 7, 2, 'ffff', 4, '2024-07-23', '2024-07-24', '20:00:00', '08:00:00', '2024-07-23 20:00:00', '2024-07-24 08:00:00', 1, 'ccccc', 2, '2024-07-30 10:30:12'),
                                                                                                                                                                                                                                                                   (43, 29, 8, 22, 2, '', 4, '2024-07-23', '2024-07-24', '20:00:00', '08:00:00', '2024-07-23 20:00:00', '2024-07-24 08:00:00', 1, '', 2, '2024-07-30 10:30:12'),
                                                                                                                                                                                                                                                                   (44, 29, 8, 45, 2, 'vvvv', 7, '2024-07-23', '2024-07-24', '20:00:00', '08:00:00', '2024-07-23 20:00:00', '2024-07-24 08:00:00', 1, '', 2, '2024-07-30 10:30:12'),
                                                                                                                                                                                                                                                                   (45, 29, 8, 6, 8, '----', 6, '2024-07-30', '2024-07-30', '13:35:00', '15:45:00', '2024-07-30 13:35:00', '2024-07-30 15:45:00', 0, '----', 1, '2024-07-30 10:32:53'),
                                                                                                                                                                                                                                                                   (46, 29, 8, 16, 8, '', 4, '2024-07-30', '2024-07-30', '13:35:00', '15:45:00', '2024-07-30 13:35:00', '2024-07-30 15:45:00', 0, '----', 1, '2024-07-30 10:32:53'),
                                                                                                                                                                                                                                                                   (50, 29, 8, 23, 1, 'Труд', 6, '2024-07-31', '2024-07-31', '08:00:00', '20:00:00', '2024-07-31 08:00:00', '2024-07-31 20:00:00', 0, 'Легкий', 1, '2024-07-31 14:52:10'),
                                                                                                                                                                                                                                                                   (51, 29, 8, 36, 1, 'Легкий2', 4, '2024-07-31', '2024-07-31', '08:00:00', '20:00:00', '2024-07-31 08:00:00', '2024-07-31 20:00:00', 0, '', 1, '2024-07-31 14:52:11'),
                                                                                                                                                                                                                                                                   (52, 29, 8, 21, 1, '', 6, '2024-07-31', '2024-07-31', '08:00:00', '20:00:00', '2024-07-31 08:00:00', '2024-07-31 20:00:00', 0, 'Труд2', 1, '2024-07-31 14:52:11'),
                                                                                                                                                                                                                                                                   (53, 29, 8, 22, 1, 'Труд3', 8, '2024-07-31', '2024-07-31', '08:00:00', '20:00:00', '2024-07-31 08:00:00', '2024-07-31 20:00:00', 0, 'Труд3', 1, '2024-07-31 14:52:11'),
                                                                                                                                                                                                                                                                   (54, 29, 8, 46, 1, '', 7, '2024-07-31', '2024-07-31', '08:00:00', '20:00:00', '2024-07-31 08:00:00', '2024-07-31 20:00:00', 0, '', 1, '2024-07-31 14:52:11'),
                                                                                                                                                                                                                                                                   (55, 29, 8, 6, 10, '-', 4, '2024-07-31', '2024-08-01', '20:00:00', '02:30:00', '2024-07-31 20:00:00', '2024-08-01 02:30:00', 1, '-', 1, '2024-07-31 14:53:34'),
                                                                                                                                                                                                                                                                   (56, 29, 8, 10, 10, '-----', 6, '2024-07-31', '2024-08-01', '20:00:00', '02:30:00', '2024-07-31 20:00:00', '2024-08-01 02:30:00', 1, '', 1, '2024-07-31 14:53:34'),
                                                                                                                                                                                                                                                                   (57, 29, 8, 21, 10, '', 7, '2024-07-31', '2024-08-01', '20:00:00', '02:30:00', '2024-07-31 20:00:00', '2024-08-01 02:30:00', 1, '', 1, '2024-07-31 14:53:34'),
                                                                                                                                                                                                                                                                   (58, 29, 8, 22, 10, '', 8, '2024-07-31', '2024-08-01', '20:00:00', '02:30:00', '2024-07-31 20:00:00', '2024-08-01 02:30:00', 1, '--', 1, '2024-07-31 14:53:34'),
                                                                                                                                                                                                                                                                   (59, 29, 8, 40, 10, '', 7, '2024-07-31', '2024-08-01', '20:00:00', '02:30:00', '2024-07-31 20:00:00', '2024-08-01 02:30:00', 1, 'нет', 1, '2024-07-31 14:53:34'),
                                                                                                                                                                                                                                                                   (60, 29, 8, 5, 11, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorem error impedit laboriosam similique voluptatibus! Consequatur fuga harum libero necessitatibus pariatur perferendis ut voluptas voluptatem! Culpa ipsa labore libero necessitatibus nihil porro qui, ut voluptas?', 4, '2024-08-01', '2024-08-02', '22:00:00', '01:00:00', '2024-08-01 22:00:00', '2024-08-02 01:00:00', NULL, 'o necessitatibus pariatur perferendis ut voluptas voluptatem! Culpa ipsa labore libero necessitatibus nihil porro qui, ut voluptas?', 2, '2024-07-31 17:08:00'),
                                                                                                                                                                                                                                                                   (61, 29, 8, 22, 11, 'Lorem ipsum osam similique voluptatibus! Consequatur fuga harum libero necessitatibus pariatur perferendis ut voluptas voluptatem! Culpa ipsa labore libero necessitatibus nihil porro qui, ut voluptas?', 4, '2024-08-01', '2024-08-02', '22:00:00', '01:00:00', '2024-08-01 22:00:00', '2024-08-02 01:00:00', NULL, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolorem error impedit laboriosam similique voluptatibus! Consequatur fuga harum liber', 1, '2024-07-31 17:08:00'),
                                                                                                                                                                                                                                                                   (62, 29, 8, 29, 11, 'Loremulpa ipsa labore libero necessitatibus nihil porro qui, ut voluptas?', 6, '2024-08-01', '2024-08-02', '22:00:00', '01:00:00', '2024-08-01 22:00:00', '2024-08-02 01:00:00', NULL, '', 1, '2024-07-31 17:08:00'),
                                                                                                                                                                                                                                                                   (63, 29, 8, 36, 11, '', 4, '2024-08-01', '2024-08-02', '22:00:00', '01:00:00', '2024-08-01 22:00:00', '2024-08-02 01:00:00', NULL, 'dolor sit amet, consectetur adipisicing elit. Cum dolorem error impedit labori', 1, '2024-07-31 17:08:00'),
                                                                                                                                                                                                                                                                   (64, 29, 8, 47, 11, 'dolor sit amet, consectetur adipisicing elit. Cum dolorem error impedit laboridolor sit amet, consectetur adipisicing elit. Cum dolorem error impedit labori', 4, '2024-08-01', '2024-08-02', '22:00:00', '01:00:00', '2024-08-01 22:00:00', '2024-08-02 01:00:00', NULL, 'dolor sit amet, consectetur adipisicing elit. Cum dolorem error impedit labori', 1, '2024-07-31 17:08:00'),
                                                                                                                                                                                                                                                                   (65, 29, 8, 6, 6, NULL, 7, '2024-08-03', '2024-08-03', '13:09:49', '17:07:49', '2024-08-03 13:09:49', '2024-08-03 17:07:49', NULL, NULL, 2, '2024-08-01 11:05:49'),
                                                                                                                                                                                                                                                                   (66, 29, 8, 5, 1, '', 4, '2024-08-03', '2024-08-03', '17:10:00', '19:10:00', '2024-08-03 17:10:00', '2024-08-03 19:10:00', 0, '', 1, '2024-08-01 15:09:09'),
                                                                                                                                                                                                                                                                   (67, 29, 8, 6, 1, '', 6, '2024-08-03', '2024-08-03', '17:10:00', '19:10:00', '2024-08-03 17:10:00', '2024-08-03 19:10:00', 0, '', 1, '2024-08-01 15:09:09'),
                                                                                                                                                                                                                                                                   (68, 29, 8, 48, 2, '', 4, '2024-08-05', '2024-08-06', '21:50:00', '03:30:00', '2024-08-05 21:50:00', '2024-08-06 03:30:00', 1, '', 1, '2024-08-01 15:17:08'),
                                                                                                                                                                                                                                                                   (69, 29, 8, 47, 2, '', 6, '2024-08-05', '2024-08-06', '21:50:00', '03:30:00', '2024-08-05 21:50:00', '2024-08-06 03:30:00', 1, '', 1, '2024-08-01 15:17:08'),
                                                                                                                                                                                                                                                                   (70, 29, 8, 10, 9, 'vvvvv', 6, '2024-08-07', '2024-08-07', '08:00:00', '20:00:00', '2024-08-07 08:00:00', '2024-08-07 20:00:00', 0, 'ccccc....', 0, '2024-08-01 17:10:42'),
                                                                                                                                                                                                                                                                   (71, 29, 8, 6, 9, 'cccccc', 4, '2024-08-07', '2024-08-07', '08:00:00', '20:00:00', '2024-08-07 08:00:00', '2024-08-07 20:00:00', 0, '..bb', 0, '2024-08-01 17:10:42'),
                                                                                                                                                                                                                                                                   (72, 29, 8, 10, 5, '', 6, '2024-08-04', '2024-08-14', '19:26:00', '20:00:00', '2024-08-04 19:26:00', '2024-08-14 20:00:00', 0, '', 0, '2024-08-01 17:27:06'),
                                                                                                                                                                                                                                                                   (73, 25, 8, 8, 5, '----', 4, '2024-08-02', '2024-08-02', '13:15:00', '14:00:00', '2024-08-02 13:15:00', '2024-08-02 14:00:00', 0, '----', 2, '2024-08-02 09:15:23'),
                                                                                                                                                                                                                                                                   (74, 25, 8, 7, 5, '++++', 6, '2024-08-02', '2024-08-02', '13:15:00', '14:00:00', '2024-08-02 13:15:00', '2024-08-02 14:00:00', 0, '----', 1, '2024-08-02 09:15:23'),
                                                                                                                                                                                                                                                                   (75, 25, 8, 9, 5, '---++', 7, '2024-08-02', '2024-08-02', '13:15:00', '14:00:00', '2024-08-02 13:15:00', '2024-08-02 14:00:00', 0, '+++', 1, '2024-08-02 09:15:23');

--
-- Триггеры `technique_order`
--
DELIMITER $$
CREATE TRIGGER `before_insert_technique_order` BEFORE INSERT ON `technique_order` FOR EACH ROW BEGIN
    -- Объединяем дату и время для datetime_from
    SET NEW.datetime_from = STR_TO_DATE(CONCAT(NEW.date_from, ' ', NEW.time_from), '%Y-%m-%d %H:%i:%s');

    -- Объединяем дату и время для datetime_to
    SET NEW.datetime_to = STR_TO_DATE(CONCAT(NEW.date_to, ' ', NEW.time_to), '%Y-%m-%d %H:%i:%s');
END
    $$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `types_drives`
--

CREATE TABLE `types_drives` (
                                `id` int NOT NULL,
                                `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `types_drives`
--

INSERT INTO `types_drives` (`id`, `name`) VALUES
                                              (2, 'Гидравлический'),
                                              (3, 'Пневматический'),
                                              (1, 'Пневмогидравлический'),
                                              (4, 'Пневмогидравлический с ААЗК'),
                                              (5, 'Ручной');

-- --------------------------------------------------------

--
-- Структура таблицы `types_reinforcement`
--

CREATE TABLE `types_reinforcement` (
                                       `id` int NOT NULL,
                                       `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `types_reinforcement`
--

INSERT INTO `types_reinforcement` (`id`, `name`) VALUES
    (2, 'Шаровой');

-- --------------------------------------------------------

--
-- Структура таблицы `type_of_technique`
--

CREATE TABLE `type_of_technique` (
                                     `id` int NOT NULL,
                                     `name` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `type_of_technique`
--

INSERT INTO `type_of_technique` (`id`, `name`) VALUES
                                                   (1, 'Автобус'),
                                                   (2, 'Автогрейдер'),
                                                   (3, 'Автокран'),
                                                   (4, 'Автоцистерна'),
                                                   (5, 'Бортовая'),
                                                   (6, 'Бульдозер'),
                                                   (7, 'Бульдозер колесный'),
                                                   (8, 'Бурильно-крановая'),
                                                   (9, 'Вахтовый автобус'),
                                                   (10, 'Гусеничный транспортер'),
                                                   (11, 'Илососная'),
                                                   (12, 'Легковая'),
                                                   (13, 'Монтажный подъёмник'),
                                                   (14, 'Пескоразбрасыватель'),
                                                   (15, 'Пожарная'),
                                                   (16, 'ППУ'),
                                                   (17, 'Самосвал'),
                                                   (18, 'Седельный тягач'),
                                                   (19, 'Трубоукладчик'),
                                                   (20, 'Уборочный трактор'),
                                                   (21, 'УМП-350'),
                                                   (22, 'Фургон'),
                                                   (23, 'Экскаватор'),
                                                   (24, 'Экскаватор колесный'),
                                                   (25, 'Микроавтобус'),
                                                   (26, 'Погрузчик'),
                                                   (27, 'Агрегат сварочный'),
                                                   (28, 'Грузопассажирский транспорт');

-- --------------------------------------------------------

--
-- Структура таблицы `unification_cranes`
--

CREATE TABLE `unification_cranes` (
                                      `id` int NOT NULL,
                                      `name` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `unification_cranes`
--

INSERT INTO `unification_cranes` (`id`, `name`) VALUES
                                                    (1, '537 КрУ'),
                                                    (2, 'КЦ');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
                         `id` int NOT NULL,
                         `login` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         `privilege` int NOT NULL,
                         `service_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `privilege`, `service_id`) VALUES
                                                                   (1, 'ii.ivanov', 0, NULL),
                                                                   (2, 'ii.ivanov2', 0, NULL),
                                                                   (3, 'ii.ivanov3', 0, NULL),
                                                                   (4, 'ii.ivanov4', 0, NULL),
                                                                   (5, 'ii.ivanov5', 0, NULL),
                                                                   (6, 'ii.ivano66', 0, NULL),
                                                                   (7, 'wqdqd', 0, NULL),
                                                                   (8, 'ii.ivanov7', 0, NULL),
                                                                   (9, 'ii.ivanov10', 0, NULL),
                                                                   (10, 'ii.ivanov11', 0, NULL),
                                                                   (11, 'ii.ivanov12', 0, NULL),
                                                                   (12, 'ii.ivanov13', 0, NULL),
                                                                   (13, 'ii.ivanov14', 0, NULL),
                                                                   (14, 'ii.ivanov15', 0, NULL),
                                                                   (15, 'ii.ivanov16', 0, NULL),
                                                                   (16, 'ii.ivanov17', 0, NULL),
                                                                   (17, 'ii.ivanov18', 0, NULL),
                                                                   (18, 'ii.ivanov19', 1, NULL),
                                                                   (19, 'ii.ivanov22', 0, NULL),
                                                                   (20, 'ii.ivanov25', 0, NULL),
                                                                   (21, 'ii.ivanov26', 0, NULL),
                                                                   (22, 'ii.ivanov001', 0, 8),
                                                                   (23, 'ee.litva3', 3, 8),
                                                                   (24, 'ee.litva1', 1, 8),
                                                                   (25, 'ee.litva2', 2, 8),
                                                                   (26, 'ee.litva4', 4, 8),
                                                                   (27, 'ee.litva5', 5, 8),
                                                                   (29, 'ee.litva6', 6, 8),
                                                                   (30, 'ee.litva0', 0, 8),
                                                                   (31, 'ee.litva7', 0, 8),
                                                                   (32, 'ee.litva16', 6, 4);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `applications`
--
ALTER TABLE `applications`
    ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status` (`status`);

--
-- Индексы таблицы `application_status`
--
ALTER TABLE `application_status`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `value` (`value`);

--
-- Индексы таблицы `companies`
--
ALTER TABLE `companies`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `firm` (`firm`),
  ADD KEY `location` (`location`);

--
-- Индексы таблицы `crane_classes`
--
ALTER TABLE `crane_classes`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `document_cranes`
--
ALTER TABLE `document_cranes`
    ADD PRIMARY KEY (`id`),
  ADD KEY `id_fitting` (`id_fitting`);

--
-- Индексы таблицы `drives`
--
ALTER TABLE `drives`
    ADD PRIMARY KEY (`id`),
  ADD KEY `type_drive` (`type_drive`),
  ADD KEY `company` (`company`),
  ADD KEY `liquid` (`liquid`);

--
-- Индексы таблицы `executions`
--
ALTER TABLE `executions`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `fittings`
--
ALTER TABLE `fittings`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_drive` (`id_drive`),
  ADD UNIQUE KEY `id_malfunction` (`id_malfunction`),
  ADD KEY `name_highways` (`name_highways`),
  ADD KEY `company` (`company`),
  ADD KEY `IUS` (`IUS`),
  ADD KEY `unification_crane` (`unification_crane`),
  ADD KEY `accessories` (`crane_class`),
  ADD KEY `type_reinforcement` (`type_reinforcement`),
  ADD KEY `execution` (`execution`),
  ADD KEY `name_crane` (`name_crane`);

--
-- Индексы таблицы `highways`
--
ALTER TABLE `highways`
    ADD PRIMARY KEY (`id`),
  ADD KEY `lpumg` (`lpumg`),
  ADD KEY `name` (`name`);

--
-- Индексы таблицы `ius`
--
ALTER TABLE `ius`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `liquids`
--
ALTER TABLE `liquids`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `list_act_leakages`
--
ALTER TABLE `list_act_leakages`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_classification_installations`
--
ALTER TABLE `list_classification_installations`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_general_descriptions`
--
ALTER TABLE `list_general_descriptions`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `list_leakages`
--
ALTER TABLE `list_leakages`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_results`
--
ALTER TABLE `list_results`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_strapping`
--
ALTER TABLE `list_strapping`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `list_tightness`
--
ALTER TABLE `list_tightness`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `location`
--
ALTER TABLE `location`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `name_2` (`name`);

--
-- Индексы таблицы `lpumgs`
--
ALTER TABLE `lpumgs`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `malfunctions`
--
ALTER TABLE `malfunctions`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `name_cranes`
--
ALTER TABLE `name_cranes`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `passwords`
--
ALTER TABLE `passwords`
    ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `photo_cranes`
--
ALTER TABLE `photo_cranes`
    ADD PRIMARY KEY (`id`),
  ADD KEY `id_fitting` (`id_fitting`);

--
-- Индексы таблицы `privileges`
--
ALTER TABLE `privileges`
    ADD PRIMARY KEY (`id`),
  ADD KEY `work_position` (`work_position`);

--
-- Индексы таблицы `responses`
--
ALTER TABLE `responses`
    ADD PRIMARY KEY (`id`),
  ADD KEY `responses_ibfk_1` (`application_id`),
  ADD KEY `status` (`status`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `responsible_person`
--
ALTER TABLE `responsible_person`
    ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Индексы таблицы `route`
--
ALTER TABLE `route`
    ADD PRIMARY KEY (`id`),
  ADD KEY `route_ibfk_1` (`service_id`);

--
-- Индексы таблицы `services`
--
ALTER TABLE `services`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `technique`
--
ALTER TABLE `technique`
    ADD PRIMARY KEY (`id_technique`),
  ADD KEY `id_type_of_techniques` (`id_type_of_techniques`);

--
-- Индексы таблицы `technique_order`
--
ALTER TABLE `technique_order`
    ADD PRIMARY KEY (`id`),
  ADD KEY `technique_order_ibfk_3` (`service_id`),
  ADD KEY `technique_order_ibfk_4` (`technique_id`),
  ADD KEY `technique_order_ibfk_2` (`route_id`),
  ADD KEY `technique_order_ibfk_1` (`responsible_person_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `types_drives`
--
ALTER TABLE `types_drives`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `types_reinforcement`
--
ALTER TABLE `types_reinforcement`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `type_of_technique`
--
ALTER TABLE `type_of_technique`
    ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `unification_cranes`
--
ALTER TABLE `unification_cranes`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `privilege` (`privilege`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `applications`
--
ALTER TABLE `applications`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `application_status`
--
ALTER TABLE `application_status`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `companies`
--
ALTER TABLE `companies`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `crane_classes`
--
ALTER TABLE `crane_classes`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `document_cranes`
--
ALTER TABLE `document_cranes`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `drives`
--
ALTER TABLE `drives`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `executions`
--
ALTER TABLE `executions`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `fittings`
--
ALTER TABLE `fittings`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `highways`
--
ALTER TABLE `highways`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT для таблицы `ius`
--
ALTER TABLE `ius`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `liquids`
--
ALTER TABLE `liquids`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `list_act_leakages`
--
ALTER TABLE `list_act_leakages`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `list_classification_installations`
--
ALTER TABLE `list_classification_installations`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `list_general_descriptions`
--
ALTER TABLE `list_general_descriptions`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `list_leakages`
--
ALTER TABLE `list_leakages`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `list_results`
--
ALTER TABLE `list_results`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `list_strapping`
--
ALTER TABLE `list_strapping`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `list_tightness`
--
ALTER TABLE `list_tightness`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `location`
--
ALTER TABLE `location`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `lpumgs`
--
ALTER TABLE `lpumgs`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `malfunctions`
--
ALTER TABLE `malfunctions`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `name_cranes`
--
ALTER TABLE `name_cranes`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `passwords`
--
ALTER TABLE `passwords`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `photo_cranes`
--
ALTER TABLE `photo_cranes`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT для таблицы `privileges`
--
ALTER TABLE `privileges`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `responses`
--
ALTER TABLE `responses`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT для таблицы `responsible_person`
--
ALTER TABLE `responsible_person`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `route`
--
ALTER TABLE `route`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `services`
--
ALTER TABLE `services`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `technique`
--
ALTER TABLE `technique`
    MODIFY `id_technique` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT для таблицы `technique_order`
--
ALTER TABLE `technique_order`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT для таблицы `types_drives`
--
ALTER TABLE `types_drives`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `types_reinforcement`
--
ALTER TABLE `types_reinforcement`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `type_of_technique`
--
ALTER TABLE `type_of_technique`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `unification_cranes`
--
ALTER TABLE `unification_cranes`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `applications`
--
ALTER TABLE `applications`
    ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`status`) REFERENCES `application_status` (`value`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `companies`
--
ALTER TABLE `companies`
    ADD CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`location`) REFERENCES `location` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `document_cranes`
--
ALTER TABLE `document_cranes`
    ADD CONSTRAINT `document_cranes_ibfk_1` FOREIGN KEY (`id_fitting`) REFERENCES `fittings` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `drives`
--
ALTER TABLE `drives`
    ADD CONSTRAINT `drives_ibfk_1` FOREIGN KEY (`type_drive`) REFERENCES `types_drives` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `drives_ibfk_2` FOREIGN KEY (`company`) REFERENCES `companies` (`firm`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `drives_ibfk_3` FOREIGN KEY (`liquid`) REFERENCES `liquids` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `fittings`
--
ALTER TABLE `fittings`
    ADD CONSTRAINT `fittings_ibfk_1` FOREIGN KEY (`name_highways`) REFERENCES `highways` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fittings_ibfk_10` FOREIGN KEY (`crane_class`) REFERENCES `crane_classes` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fittings_ibfk_11` FOREIGN KEY (`name_crane`) REFERENCES `name_cranes` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fittings_ibfk_2` FOREIGN KEY (`company`) REFERENCES `companies` (`firm`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fittings_ibfk_3` FOREIGN KEY (`id_malfunction`) REFERENCES `malfunctions` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fittings_ibfk_4` FOREIGN KEY (`IUS`) REFERENCES `ius` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fittings_ibfk_5` FOREIGN KEY (`unification_crane`) REFERENCES `unification_cranes` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fittings_ibfk_7` FOREIGN KEY (`type_reinforcement`) REFERENCES `types_reinforcement` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fittings_ibfk_8` FOREIGN KEY (`execution`) REFERENCES `executions` (`name`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fittings_ibfk_9` FOREIGN KEY (`id_drive`) REFERENCES `drives` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `highways`
--
ALTER TABLE `highways`
    ADD CONSTRAINT `highways_ibfk_1` FOREIGN KEY (`lpumg`) REFERENCES `lpumgs` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `passwords`
--
ALTER TABLE `passwords`
    ADD CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `photo_cranes`
--
ALTER TABLE `photo_cranes`
    ADD CONSTRAINT `photo_cranes_ibfk_1` FOREIGN KEY (`id_fitting`) REFERENCES `fittings` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `responses`
--
ALTER TABLE `responses`
    ADD CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `responses_ibfk_2` FOREIGN KEY (`status`) REFERENCES `application_status` (`value`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `responses_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `responsible_person`
--
ALTER TABLE `responsible_person`
    ADD CONSTRAINT `responsible_person_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
