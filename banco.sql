-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.19 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para banco
CREATE DATABASE IF NOT EXISTS `banco` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `banco`;


-- Volcando estructura para tabla banco.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `dniCliente` varchar(50) NOT NULL,
  `nombreCliente` varchar(50) NOT NULL,
  `apellido1Cliente` varchar(50) DEFAULT NULL,
  `apellido2Cliente` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.


-- Volcando estructura para tabla banco.cuentabancaria
CREATE TABLE IF NOT EXISTS `cuentabancaria` (
  `idCuentaBancaria` int(11) NOT NULL AUTO_INCREMENT,
  `numeroCuentaBancaria` int(11) NOT NULL DEFAULT '0',
  `idEntidadBancaria` int(11) NOT NULL DEFAULT '0',
  `idCliente` int(11) DEFAULT NULL,
  PRIMARY KEY (`idCuentaBancaria`),
  KEY `FKidEntidadBancariaCuenta` (`idEntidadBancaria`),
  KEY `FKidCliente` (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.


-- Volcando estructura para tabla banco.empleado
CREATE TABLE IF NOT EXISTS `empleado` (
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `dniEmpleado` varchar(50) DEFAULT '0',
  `nombreEmpleado` varchar(50) DEFAULT '0',
  `apellido1Empleado` varchar(50) DEFAULT '0',
  `apellido2Empleado` varchar(50) DEFAULT '0',
  `idSucursalBancaria` int(11) DEFAULT '0',
  `loginEmpleado` varchar(50) DEFAULT '0',
  `passwordEmpleado` varchar(50) DEFAULT '0',
  PRIMARY KEY (`idEmpleado`),
  KEY `FKSucursalBancariaEmpleado` (`idSucursalBancaria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.


-- Volcando estructura para tabla banco.entidadbancaria
CREATE TABLE IF NOT EXISTS `entidadbancaria` (
  `idEntidadBancaria` int(11) NOT NULL AUTO_INCREMENT,
  `codigoEntidadBancaria` varchar(50) DEFAULT NULL,
  `nombreEntidadBancaria` varchar(50) DEFAULT NULL,
  `fechaCreacionEntidadBancaria` date DEFAULT NULL,
  PRIMARY KEY (`idEntidadBancaria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.


-- Volcando estructura para tabla banco.movimientobancario
CREATE TABLE IF NOT EXISTS `movimientobancario` (
  `idMovimientoBancario` int(11) NOT NULL AUTO_INCREMENT,
  `idCuentaBancariaOrigen` int(11) NOT NULL,
  `idCuentaBancariaDestino` int(11) NOT NULL,
  `cantidadMovimientoBancario` decimal(10,2) DEFAULT '0.00',
  `conceptoMovimientoBancario` varchar(50) DEFAULT '0',
  PRIMARY KEY (`idMovimientoBancario`),
  KEY `FKCuentaBancariaMovimiento` (`idCuentaBancariaOrigen`),
  KEY `FKCuentaBancariaMovimiento2` (`idCuentaBancariaDestino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.


-- Volcando estructura para tabla banco.schema_version
CREATE TABLE IF NOT EXISTS `schema_version` (
  `version_rank` int(11) NOT NULL,
  `installed_rank` int(11) NOT NULL,
  `version` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int(11) DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int(11) NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`version`),
  KEY `schema_version_vr_idx` (`version_rank`),
  KEY `schema_version_ir_idx` (`installed_rank`),
  KEY `schema_version_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.


-- Volcando estructura para tabla banco.sucursalbancaria
CREATE TABLE IF NOT EXISTS `sucursalbancaria` (
  `idSucursalBancaria` int(11) NOT NULL AUTO_INCREMENT,
  `nombreSucursalBancaria` varchar(50) DEFAULT NULL,
  `direccionSucursalBancaria` varchar(50) DEFAULT NULL,
  `idEntidadBancaria` int(11) NOT NULL,
  PRIMARY KEY (`idSucursalBancaria`),
  KEY `FKEntidadBancariaSucursal` (`idEntidadBancaria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
