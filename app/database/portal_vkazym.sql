-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 16 2024 г., 17:30
-- Версия сервера: 8.0.36
-- Версия PHP: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `portal_vkazym`
--

-- --------------------------------------------------------

--
-- Структура таблицы `passwords`
--

CREATE TABLE `passwords` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
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
(29, 27, '$2y$10$IzfnTtrtFnqEDYdpDcZu1.HHg5VaZFQm.vpXvELu.qcdp8L53B2dK');

-- --------------------------------------------------------

--
-- Структура таблицы `privileges`
--

CREATE TABLE `privileges` (
  `id` int NOT NULL,
  `work_position` int NOT NULL DEFAULT '0',
  `transcript` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
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
-- Структура таблицы `responsible_person`
--

CREATE TABLE `responsible_person` (
  `id` int NOT NULL,
  `first_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `middle_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service_id` int NOT NULL,
  `phone_number` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `responsible_person`
--

INSERT INTO `responsible_person` (`id`, `first_name`, `middle_name`, `last_name`, `service_id`, `phone_number`) VALUES
(1, 'Борис', 'Борисович', 'Б', 4, '00-001'),
(4, 'Юрий', 'Владимирович', 'С', 8, '89220000000');

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
(1, 'ДЛО', 8),
(2, 'ДЛО-2', 8),
(3, 'Жил поселок', 12),
(5, 'ДЛО-4', 8),
(6, 'ДЛО-5', 8),
(7, 'ДЛО-6', 8),
(8, 'ДЛО-8', 8);

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
  `service_id` int NOT NULL,
  `technique_id` int NOT NULL,
  `route_id` int NOT NULL,
  `work_activity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `responsible_person_id` int NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `time_from` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_to` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `shift` int DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(23, 'ee.litva3', 0, 8),
(24, 'ee.litva1', 0, 8),
(25, 'ee.litva2', 0, 8),
(26, 'ee.litva11', 0, 8),
(27, 'ee.litva55', 0, 8),
(29, 'ee.litva23', 0, 8),
(30, 'ee.litva22', 0, 8);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `passwords`
--
ALTER TABLE `passwords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `work_position` (`work_position`);

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
  ADD KEY `technique_order_ibfk_1` (`responsible_person_id`);

--
-- Индексы таблицы `type_of_technique`
--
ALTER TABLE `type_of_technique`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `privilege` (`privilege`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `passwords`
--
ALTER TABLE `passwords`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `responsible_person`
--
ALTER TABLE `responsible_person`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `route`
--
ALTER TABLE `route`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `type_of_technique`
--
ALTER TABLE `type_of_technique`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `passwords`
--
ALTER TABLE `passwords`
  ADD CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `responsible_person`
--
ALTER TABLE `responsible_person`
  ADD CONSTRAINT `responsible_person_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `route`
--
ALTER TABLE `route`
  ADD CONSTRAINT `route_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `technique`
--
ALTER TABLE `technique`
  ADD CONSTRAINT `technique_ibfk_1` FOREIGN KEY (`id_type_of_techniques`) REFERENCES `type_of_technique` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `technique_order`
--
ALTER TABLE `technique_order`
  ADD CONSTRAINT `technique_order_ibfk_1` FOREIGN KEY (`responsible_person_id`) REFERENCES `responsible_person` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `technique_order_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `route` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `technique_order_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `technique_order_ibfk_4` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id_technique`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`privilege`) REFERENCES `privileges` (`work_position`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
