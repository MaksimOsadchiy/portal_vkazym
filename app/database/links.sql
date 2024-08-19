-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Авг 19 2024 г., 18:09
-- Версия сервера: 11.4.2-MariaDB
-- Версия PHP: 8.3.7

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
-- Структура таблицы `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `color` text NOT NULL,
  `link` text NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `links`
--

INSERT INTO `links` (`id`, `type`, `color`, `link`, `text`) VALUES
(1, 1, 'yellow', 'technique.php', 'Заказ техники'),
(2, 1, 'blue', 'appsForm.php', 'Заявки'),
(3, 2, 'link', '#', 'Redmine'),
(4, 2, 'link', '#', 'Portal portal.ttg.gazprom.ru'),
(5, 1, 'green', '#', 'Краны'),
(6, 1, 'red', '#', 'ЛКРИ'),
(7, 1, 'blue', '#', 'Приложение +1'),
(8, 2, 'link', '#', 'Ссылка 3'),
(9, 2, 'link', '#', 'Ссылка 4'),
(10, 2, 'link', '#', 'Ссылка 5'),
(11, 2, 'link', '#', 'Ссылка 6'),
(12, 2, 'link', '#', 'Ссылка 7');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
