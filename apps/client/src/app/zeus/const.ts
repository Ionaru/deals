/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DealSortChoices: "enum" as const,
	Mutation:{
		addPasskey:{

		},
		loginUser:{

		},
		registerUser:{

		},
		resolveUnknownDeal:{

		},
		startScraper:{

		},
		startTask:{

		}
	},
	Order: "enum" as const,
	ProductSortChoices: "enum" as const,
	Query:{
		deal:{

		},
		deals:{
			order:"Order",
			sort:"DealSortChoices"
		},
		product:{

		},
		products:{
			order:"Order",
			sort:"ProductSortChoices"
		},
		service:{

		},
		task:{

		},
		user:{

		}
	},
	ServiceType: "enum" as const,
	ID: `scalar.ID` as const
}

export const ReturnTypes: Record<string,any> = {
	DealDTO:{
		dealPrice:"Float",
		dealQuantity:"Int",
		id:"String",
		product:"ProductDTO"
	},
	DealPaginatedType:{
		items:"DealDTO",
		meta:"PaginationMeta"
	},
	ExtendedProductDTO:{
		dealHistory:"ProductDealHistoryDTO",
		id:"String",
		imageUrl:"String",
		name:"String",
		price:"Float",
		priceHistory:"ProductPriceHistoryDTO",
		productUrl:"String",
		shop:"ShopDTO"
	},
	Mutation:{
		addPasskey:"Boolean",
		loginUser:"Boolean",
		logoutUser:"Boolean",
		registerUser:"Boolean",
		resolveUnknownDeal:"Boolean",
		startScraper:"Boolean",
		startTask:"Boolean"
	},
	PaginationMeta:{
		currentPage:"Int",
		itemCount:"Int",
		itemsPerPage:"Int",
		totalItems:"Int",
		totalPages:"Int"
	},
	ProductDTO:{
		id:"String",
		imageUrl:"String",
		name:"String",
		price:"Float",
		productUrl:"String",
		shop:"ShopDTO"
	},
	ProductDealHistoryDTO:{
		createdOn:"String",
		dealPrice:"Float",
		dealQuantity:"Float",
		deletedOn:"String"
	},
	ProductPaginatedType:{
		items:"ProductDTO",
		meta:"PaginationMeta"
	},
	ProductPriceHistoryDTO:{
		createdOn:"String",
		price:"Float"
	},
	Query:{
		challenge:"String",
		deal:"DealDTO",
		deals:"DealPaginatedType",
		product:"ExtendedProductDTO",
		products:"ProductPaginatedType",
		service:"ServiceHealthDTO",
		services:"ServiceHealthDTO",
		session:"SessionDTO",
		shops:"ShopDTO",
		task:"TaskDTO",
		tasks:"TaskDTO",
		unknownDeals:"UnknownDealDTO",
		user:"UserDTO",
		users:"UserDTO"
	},
	ServiceHealthDTO:{
		id:"ID",
		name:"String",
		queue:"String",
		status:"StatusDTO",
		type:"ServiceType"
	},
	SessionDTO:{
		user:"String"
	},
	ShopDTO:{
		id:"ID",
		name:"String"
	},
	StatusDTO:{
		status:"String",
		uptime:"Float"
	},
	TaskDTO:{
		lastRun:"String",
		name:"String",
		nextRun:"String"
	},
	UnknownDealDTO:{
		createdOn:"String",
		deal:"String",
		id:"ID",
		productUrl:"String",
		shop:"ShopDTO"
	},
	UserDTO:{
		id:"ID",
		isAdmin:"Boolean",
		username:"String"
	},
	ID: `scalar.ID` as const
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}