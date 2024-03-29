USE [HostelDB]
GO
/****** Object:  Table [dbo].[tbl_building]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_building](
	[BuildingId] [int] IDENTITY(1,1) NOT NULL,
	[BuildingName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbl_building] PRIMARY KEY CLUSTERED 
(
	[BuildingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_defination]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_defination](
	[DefinationId] [int] IDENTITY(1,1) NOT NULL,
	[DefinationName] [nvarchar](max) NULL,
 CONSTRAINT [PK_tbl_defination] PRIMARY KEY CLUSTERED 
(
	[DefinationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_generalcontrol]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_generalcontrol](
	[GeneralControld] [int] IDENTITY(1,1) NOT NULL,
	[BuildingId] [int] NULL,
	[RoomId] [int] NULL,
	[WareHouseId] [int] NULL,
 CONSTRAINT [PK_tbl_generalcontrol] PRIMARY KEY CLUSTERED 
(
	[GeneralControld] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_inventory]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_inventory](
	[InventoryId] [int] IDENTITY(1,1) NOT NULL,
	[InventoryName] [nvarchar](50) NULL,
	[WareHouseId] [int] NULL,
 CONSTRAINT [PK_tbl_inventory] PRIMARY KEY CLUSTERED 
(
	[InventoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_products]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_products](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NULL,
	[ProductSerialCode] [nvarchar](50) NULL,
	[ProductQuantity] [int] NULL,
	[InvantoryId] [int] NULL,
	[CreateAt] [datetime] NULL,
 CONSTRAINT [PK_tbl_products] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_room]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_room](
	[RoomId] [int] IDENTITY(1,1) NOT NULL,
	[RoomName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbl_room] PRIMARY KEY CLUSTERED 
(
	[RoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_users]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PasswordHash] [varbinary](max) NULL,
	[PasswordSalt] [varbinary](max) NULL,
	[Username] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbl_users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_warehouse]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_warehouse](
	[WareHouseId] [int] IDENTITY(1,1) NOT NULL,
	[WareHouseName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbl_warehouse] PRIMARY KEY CLUSTERED 
(
	[WareHouseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_workhouselog]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_workhouselog](
	[WorkHouseLogId] [int] IDENTITY(1,1) NOT NULL,
	[WareHouseId] [int] NULL,
	[InventoryId] [int] NULL,
	[BuildingId] [int] NULL,
	[RoomId] [int] NULL,
	[ProductId] [int] NULL,
	[CreateAt] [datetime] NULL,
 CONSTRAINT [PK_tbl_workhouselog] PRIMARY KEY CLUSTERED 
(
	[WorkHouseLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_workorder]    Script Date: 5.02.2024 01:10:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_workorder](
	[WorkOrderId] [int] IDENTITY(1,1) NOT NULL,
	[OrderText] [nvarchar](max) NULL,
	[BuildingId] [int] NULL,
	[RoomId] [int] NULL,
	[WareHouseId] [int] NULL,
	[InventoryId] [int] NULL,
	[DefinationId] [int] NULL,
	[ProductId] [int] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_tbl_workorder] PRIMARY KEY CLUSTERED 
(
	[WorkOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbl_building] ON 

INSERT [dbo].[tbl_building] ([BuildingId], [BuildingName]) VALUES (1, N'Radison')
INSERT [dbo].[tbl_building] ([BuildingId], [BuildingName]) VALUES (3, N'Movenpick')
SET IDENTITY_INSERT [dbo].[tbl_building] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_defination] ON 

INSERT [dbo].[tbl_defination] ([DefinationId], [DefinationName]) VALUES (1, N'Ürün Bakımı')
INSERT [dbo].[tbl_defination] ([DefinationId], [DefinationName]) VALUES (2, N'Ürün Parça Değişimi')
INSERT [dbo].[tbl_defination] ([DefinationId], [DefinationName]) VALUES (3, N'Ürün Arıza Kontrolü')
SET IDENTITY_INSERT [dbo].[tbl_defination] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_generalcontrol] ON 

INSERT [dbo].[tbl_generalcontrol] ([GeneralControld], [BuildingId], [RoomId], [WareHouseId]) VALUES (1, 1, 1, 2)
INSERT [dbo].[tbl_generalcontrol] ([GeneralControld], [BuildingId], [RoomId], [WareHouseId]) VALUES (2, 1, 2, 2)
INSERT [dbo].[tbl_generalcontrol] ([GeneralControld], [BuildingId], [RoomId], [WareHouseId]) VALUES (3, 3, 3, 1)
INSERT [dbo].[tbl_generalcontrol] ([GeneralControld], [BuildingId], [RoomId], [WareHouseId]) VALUES (4, 3, 3, 2)
SET IDENTITY_INSERT [dbo].[tbl_generalcontrol] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_inventory] ON 

INSERT [dbo].[tbl_inventory] ([InventoryId], [InventoryName], [WareHouseId]) VALUES (1, N'Temizlik Envanteri', 1)
INSERT [dbo].[tbl_inventory] ([InventoryId], [InventoryName], [WareHouseId]) VALUES (2, N'Mobilya Envanteri', 2)
SET IDENTITY_INSERT [dbo].[tbl_inventory] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_products] ON 

INSERT [dbo].[tbl_products] ([ProductId], [ProductName], [ProductSerialCode], [ProductQuantity], [InvantoryId], [CreateAt]) VALUES (1, N'Vilada Seti', N'0123456', 5, 1, CAST(N'2024-02-02T21:30:22.100' AS DateTime))
INSERT [dbo].[tbl_products] ([ProductId], [ProductName], [ProductSerialCode], [ProductQuantity], [InvantoryId], [CreateAt]) VALUES (2, N'Yer Paspası', N'0123123', 4, 1, CAST(N'2024-02-02T21:30:22.100' AS DateTime))
INSERT [dbo].[tbl_products] ([ProductId], [ProductName], [ProductSerialCode], [ProductQuantity], [InvantoryId], [CreateAt]) VALUES (3, N'Koltuk Takımı', N'0123444', 4, 2, CAST(N'2024-02-02T21:31:18.747' AS DateTime))
INSERT [dbo].[tbl_products] ([ProductId], [ProductName], [ProductSerialCode], [ProductQuantity], [InvantoryId], [CreateAt]) VALUES (4, N'sdfsdf', N'fdsfsdf', 10, 5, CAST(N'2024-02-03T18:15:18.117' AS DateTime))
SET IDENTITY_INSERT [dbo].[tbl_products] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_room] ON 

INSERT [dbo].[tbl_room] ([RoomId], [RoomName]) VALUES (1, N'Tek kişilik oda')
INSERT [dbo].[tbl_room] ([RoomId], [RoomName]) VALUES (2, N'Çift kişilik oda')
INSERT [dbo].[tbl_room] ([RoomId], [RoomName]) VALUES (3, N'Üç kişilik oda')
INSERT [dbo].[tbl_room] ([RoomId], [RoomName]) VALUES (4, N'Dört kişilik oda')
INSERT [dbo].[tbl_room] ([RoomId], [RoomName]) VALUES (5, N'Aile odası')
INSERT [dbo].[tbl_room] ([RoomId], [RoomName]) VALUES (6, N'Kral dairesi')
SET IDENTITY_INSERT [dbo].[tbl_room] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_users] ON 

INSERT [dbo].[tbl_users] ([Id], [PasswordHash], [PasswordSalt], [Username]) VALUES (9, 0xCDE07C71EB4323025B4CA8699E641B95D69C49540286A3F15F44C86103FA149623C8DA3DF82C69463B2C1A976598284FD492CA143DE2F87AB71F504781AA8C38, 0xA970B390A70852BBE2B3182633D70D6D24E638EF893BE814343722B9647941F42B88581F6C4559D5FC347EA042344AA4BCB1E10BC9F63E3FDA5D7479074236D7B827DA60E9C202CB44AE2B3AD5D04B5FACDA6CA896BB64D01B522565CD358666E7965746FDFB7D56FC9F10EA5B2D4F3F47F5A98A443622521C3923B92876CFB2, N'admin')
INSERT [dbo].[tbl_users] ([Id], [PasswordHash], [PasswordSalt], [Username]) VALUES (10, 0x21BE1DB9F4C77D3FE6931DABB90FFD87AE089C8383E4F4D353836CAD698DFA5A2AB413F1017E185BDB5952D0AA69AD7ACEB422213F457FB4D638E04A74261F95, 0x0A0844A46E28943A6E2393D966803C040A0FD708657D1E248F6E7F635879FB1740B2C6B1C0EBA4E507160D626C01AAFF8AE59FC7FCA49525E005F7804CCCCE73C6155135C0F558967F76BACB3C6837D5700F1B71BF145B6D15B9994012DDAF83EA9FBCA57B9B1C4571E2CD88BAE93070E2958DC46C811EF70576E3C738B4C00D, N'erhan')
SET IDENTITY_INSERT [dbo].[tbl_users] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_warehouse] ON 

INSERT [dbo].[tbl_warehouse] ([WareHouseId], [WareHouseName]) VALUES (1, N'Temizlik Deposu')
INSERT [dbo].[tbl_warehouse] ([WareHouseId], [WareHouseName]) VALUES (2, N'Eşya Deposu')
SET IDENTITY_INSERT [dbo].[tbl_warehouse] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_workhouselog] ON 

INSERT [dbo].[tbl_workhouselog] ([WorkHouseLogId], [WareHouseId], [InventoryId], [BuildingId], [RoomId], [ProductId], [CreateAt]) VALUES (1, 2, 2, 3, 4, 2, NULL)
SET IDENTITY_INSERT [dbo].[tbl_workhouselog] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_workorder] ON 

INSERT [dbo].[tbl_workorder] ([WorkOrderId], [OrderText], [BuildingId], [RoomId], [WareHouseId], [InventoryId], [DefinationId], [ProductId], [Status]) VALUES (1, N'Ürün Yardımlarınızı Bekliyorum', 1, 1, 1, 1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[tbl_workorder] OFF
GO
ALTER TABLE [dbo].[tbl_products] ADD  CONSTRAINT [DF_tbl_products_CreateAt]  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[tbl_workhouselog] ADD  CONSTRAINT [DF_tbl_workhouselog_CreateAt]  DEFAULT (getdate()) FOR [CreateAt]
GO
ALTER TABLE [dbo].[tbl_workorder] ADD  CONSTRAINT [DF_tbl_workorder_Status]  DEFAULT ((1)) FOR [Status]
GO
