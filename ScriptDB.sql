USE [master]
GO
/****** Object:  Database [DBContiCorrenti]    Script Date: 16/09/2024 17:36:33 ******/
CREATE DATABASE [DBContiCorrenti]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DBContiCorrenti', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\DBContiCorrenti.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DBContiCorrenti_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\DBContiCorrenti_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [DBContiCorrenti] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBContiCorrenti].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBContiCorrenti] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [DBContiCorrenti] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBContiCorrenti] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBContiCorrenti] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DBContiCorrenti] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBContiCorrenti] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DBContiCorrenti] SET  MULTI_USER 
GO
ALTER DATABASE [DBContiCorrenti] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBContiCorrenti] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DBContiCorrenti] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DBContiCorrenti] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DBContiCorrenti] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DBContiCorrenti] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DBContiCorrenti] SET QUERY_STORE = ON
GO
ALTER DATABASE [DBContiCorrenti] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [DBContiCorrenti]
GO
/****** Object:  Table [dbo].[TBonifico]    Script Date: 16/09/2024 17:36:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBonifico](
	[BonificoID] [int] IDENTITY(1,1) NOT NULL,
	[IndirizzoIP] [varchar](45) NOT NULL,
	[Data] [datetime] NOT NULL,
	[Stato] [varchar](50) NOT NULL,
	[MovimentoID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[BonificoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TCategorieMovimenti]    Script Date: 16/09/2024 17:36:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TCategorieMovimenti](
	[CategoriaMovimentoID] [int] IDENTITY(1,1) NOT NULL,
	[NomeCategoria] [varchar](100) NOT NULL,
	[Tipologia] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[CategoriaMovimentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TContiCorrenti]    Script Date: 16/09/2024 17:36:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TContiCorrenti](
	[ContoCorrenteID] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](255) NOT NULL,
	[Password] [varchar](255) NOT NULL,
	[CognomeTitolare] [varchar](100) NOT NULL,
	[NomeTitolare] [varchar](100) NOT NULL,
	[DataApertura] [date] NOT NULL,
	[IBAN] [varchar](34) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ContoCorrenteID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TMovimentiContoCorrente]    Script Date: 16/09/2024 17:36:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TMovimentiContoCorrente](
	[MovimentoID] [int] IDENTITY(1,1) NOT NULL,
	[ContoCorrenteID] [int] NOT NULL,
	[Data] [date] NOT NULL,
	[Importo] [decimal](10, 2) NOT NULL,
	[Saldo] [decimal](10, 2) NOT NULL,
	[CategoriaMovimentoID] [int] NOT NULL,
	[DescrizioneEstesa] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[MovimentoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRicarica]    Script Date: 16/09/2024 17:36:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRicarica](
	[RicaricaID] [int] IDENTITY(1,1) NOT NULL,
	[BonificoID] [int] NOT NULL,
	[NumeroTelefono] [varchar](15) NOT NULL,
	[Operatore] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[RicaricaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TBonifico]  WITH CHECK ADD  CONSTRAINT [FK_TBonifico_TMovimentiContoCorrente] FOREIGN KEY([MovimentoID])
REFERENCES [dbo].[TMovimentiContoCorrente] ([MovimentoID])
GO
ALTER TABLE [dbo].[TBonifico] CHECK CONSTRAINT [FK_TBonifico_TMovimentiContoCorrente]
GO
ALTER TABLE [dbo].[TMovimentiContoCorrente]  WITH CHECK ADD FOREIGN KEY([CategoriaMovimentoID])
REFERENCES [dbo].[TCategorieMovimenti] ([CategoriaMovimentoID])
GO
ALTER TABLE [dbo].[TMovimentiContoCorrente]  WITH CHECK ADD FOREIGN KEY([ContoCorrenteID])
REFERENCES [dbo].[TContiCorrenti] ([ContoCorrenteID])
GO
ALTER TABLE [dbo].[TRicarica]  WITH CHECK ADD  CONSTRAINT [FK_TRicarica_TBonifico] FOREIGN KEY([BonificoID])
REFERENCES [dbo].[TBonifico] ([BonificoID])
GO
ALTER TABLE [dbo].[TRicarica] CHECK CONSTRAINT [FK_TRicarica_TBonifico]
GO
ALTER TABLE [dbo].[TCategorieMovimenti]  WITH CHECK ADD CHECK  (([Tipologia]='Uscita' OR [Tipologia]='Entrata'))
GO
USE [master]
GO
ALTER DATABASE [DBContiCorrenti] SET  READ_WRITE 
GO
