CREATE DATABASE  IF NOT EXISTS `registroestudiantes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `registroestudiantes`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: registroestudiantes
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `ClaseId` int NOT NULL AUTO_INCREMENT,
  `MateriaId` int NOT NULL,
  `ProfesorId` int NOT NULL,
  PRIMARY KEY (`ClaseId`),
  KEY `MateriaId` (`MateriaId`),
  KEY `ProfesorId` (`ProfesorId`),
  CONSTRAINT `clases_ibfk_1` FOREIGN KEY (`MateriaId`) REFERENCES `materias` (`MateriaId`),
  CONSTRAINT `clases_ibfk_2` FOREIGN KEY (`ProfesorId`) REFERENCES `profesores` (`ProfesorId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,1),(7,7,2),(8,8,3),(9,9,4),(10,10,5);
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasesestudiantes`
--

DROP TABLE IF EXISTS `clasesestudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clasesestudiantes` (
  `ClaseEstudianteId` int NOT NULL AUTO_INCREMENT,
  `ClaseId` int NOT NULL,
  `EstudianteId` int NOT NULL,
  PRIMARY KEY (`ClaseEstudianteId`),
  UNIQUE KEY `ClaseId` (`ClaseId`,`EstudianteId`),
  KEY `EstudianteId` (`EstudianteId`),
  CONSTRAINT `clasesestudiantes_ibfk_1` FOREIGN KEY (`ClaseId`) REFERENCES `clases` (`ClaseId`),
  CONSTRAINT `clasesestudiantes_ibfk_2` FOREIGN KEY (`EstudianteId`) REFERENCES `estudiantes` (`EstudianteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasesestudiantes`
--

LOCK TABLES `clasesestudiantes` WRITE;
/*!40000 ALTER TABLE `clasesestudiantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clasesestudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `EstudianteId` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`EstudianteId`),
  UNIQUE KEY `Email` (`Email`),
  KEY `fk_user_id` (`UserId`),
  CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (11,1,'Juan Pérez','juan.perez@example.com','2024-10-02 10:50:54');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantesmaterias`
--

DROP TABLE IF EXISTS `estudiantesmaterias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantesmaterias` (
  `EstudianteMateriaId` int NOT NULL AUTO_INCREMENT,
  `EstudianteId` int NOT NULL,
  `MateriaId` int NOT NULL,
  PRIMARY KEY (`EstudianteMateriaId`),
  UNIQUE KEY `EstudianteId` (`EstudianteId`,`MateriaId`),
  KEY `MateriaId` (`MateriaId`),
  CONSTRAINT `estudiantesmaterias_ibfk_1` FOREIGN KEY (`EstudianteId`) REFERENCES `estudiantes` (`EstudianteId`),
  CONSTRAINT `estudiantesmaterias_ibfk_2` FOREIGN KEY (`MateriaId`) REFERENCES `materias` (`MateriaId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantesmaterias`
--

LOCK TABLES `estudiantesmaterias` WRITE;
/*!40000 ALTER TABLE `estudiantesmaterias` DISABLE KEYS */;
INSERT INTO `estudiantesmaterias` VALUES (19,11,1);
/*!40000 ALTER TABLE `estudiantesmaterias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `MateriaId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Creditos` int NOT NULL DEFAULT '3',
  PRIMARY KEY (`MateriaId`),
  CONSTRAINT `materias_chk_1` CHECK ((`Creditos` = 3))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Matemáticas I',3),(2,'Historia Universal',3),(3,'Biología General',3),(4,'Química General',3),(5,'Física I',3),(6,'Literatura Española',3),(7,'Geografía Humana',3),(8,'Informática Básica',3),(9,'Arte y Cultura',3),(10,'Educación Física',3);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesores`
--

DROP TABLE IF EXISTS `profesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesores` (
  `ProfesorId` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`ProfesorId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesores`
--

LOCK TABLES `profesores` WRITE;
/*!40000 ALTER TABLE `profesores` DISABLE KEYS */;
INSERT INTO `profesores` VALUES (1,'Juan Pérez','juan.perez@ejemplo.com'),(2,'Ana Gómez','ana.gomez@ejemplo.com'),(3,'Carlos López','carlos.lopez@ejemplo.com'),(4,'María Rodríguez','maria.rodriguez@ejemplo.com'),(5,'Pedro Martínez','pedro.martinez@ejemplo.com');
/*!40000 ALTER TABLE `profesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','usuario@example.com','YWRtaW4=','2024-10-02 00:35:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'registroestudiantes'
--

--
-- Dumping routines for database 'registroestudiantes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-03 10:16:14
