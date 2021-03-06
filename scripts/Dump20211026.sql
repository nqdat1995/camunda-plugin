-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: school_db
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `UserID` int NOT NULL,
  `BranchCode` varchar(45) DEFAULT NULL,
  `IDNo` varchar(45) DEFAULT NULL,
  `FullName` longtext,
  `MobileNo` varchar(45) DEFAULT NULL,
  `CustKind` varchar(45) DEFAULT NULL,
  `Score` varchar(45) DEFAULT NULL,
  `IP` varchar(45) DEFAULT NULL,
  `RiskKind` varchar(45) DEFAULT NULL,
  `UserProcess` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `MerchantID` varchar(45) DEFAULT NULL,
  `RespCode` varchar(45) DEFAULT NULL,
  `RespDesc` varchar(45) DEFAULT NULL,
  `TraceNo` varchar(45) DEFAULT NULL,
  `CIFNo` varchar(45) DEFAULT NULL,
  `CreateDate` varchar(45) DEFAULT NULL,
  `FailureCount` varchar(45) DEFAULT NULL,
  `IPDuplicatedCount` varchar(45) DEFAULT NULL,
  `UserApprove` varchar(45) DEFAULT NULL,
  `CriteriaType` varchar(45) DEFAULT NULL,
  `CriteriaValue` varchar(45) DEFAULT NULL,
  `ProcessCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (456,'546577','554554','Nguy???n V??n A	','0918672466','Normal','68','192.168.1.22','Low','In Process','Pending','5tyu8','01','failed','78900','09743','2/5/2020','5','0','ReDo','Duplicated','Yes','ex'),(2335,'45456','767668','Nguy???n V??n A','0918672597','VIP','56','192.168.1.23','High','Start','Done','57889','00','success','45678','43465','22/10/2021','2','0','OK','GTTT','Not Scan',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `ProcessNo` varchar(50) NOT NULL,
  `ProcessUID` varchar(45) DEFAULT NULL,
  `ProcessDate` varchar(45) DEFAULT NULL,
  `PriorProcessCode` varchar(45) DEFAULT NULL,
  `PriorProcessName` varchar(45) DEFAULT NULL,
  `ProcessCode` varchar(45) DEFAULT NULL,
  `ProcessName` varchar(45) DEFAULT NULL,
  `ProcessDesc` varchar(45) DEFAULT NULL,
  `TraceNo` varchar(45) DEFAULT NULL,
  `MerchantID` varchar(45) DEFAULT NULL,
  `Code` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Details` varchar(45) DEFAULT NULL,
  `TypeID` varchar(45) DEFAULT NULL,
  `ApprovalCode` varchar(45) DEFAULT NULL,
  `ApprovalReasonCode` varchar(45) DEFAULT NULL,
  `ApprovalDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ProcessNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES ('23334','434','22/11/2020','5465','prior','223434','credit','my process','123','456',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-26 15:26:21
