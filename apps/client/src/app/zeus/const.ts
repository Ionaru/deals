/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	AuthenticatorAssertionResponseDTO:{

	},
	AuthenticatorAttestationResponseDTO:{

	},
	DealSortChoices: "enum" as const,
	Mutation:{
		addUserCredential:{
			response:"AuthenticatorAttestationResponseDTO",
			user:"UserDTO"
		},
		loginUser:{
			response:"AuthenticatorAssertionResponseDTO"
		},
		registerUser:{
			response:"AuthenticatorAttestationResponseDTO",
			user:"UserDTO"
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
		check:{

		},
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
		verify:{

		}
	},
	Roles: "enum" as const,
	ServiceType: "enum" as const,
	UserDTO:{

	},
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
	JwtPayload:{
		exp:"Int",
		iat:"Int",
		roles:"Roles",
		sub:"String",
		username:"String"
	},
	MeDTO:{
		roles:"Roles",
		sub:"String",
		username:"String"
	},
	Mutation:{
		addUserCredential:"Boolean",
		createChallenge:"String",
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
		check:"Boolean",
		deal:"DealDTO",
		deals:"DealPaginatedType",
		me:"MeDTO",
		product:"ExtendedProductDTO",
		products:"ProductPaginatedType",
		service:"ServiceHealthDTO",
		services:"ServiceHealthDTO",
		shops:"ShopDTO",
		task:"TaskDTO",
		tasks:"TaskDTO",
		unknownDeals:"UnknownDealDTO",
		verify:"JwtPayload"
	},
	ServiceHealthDTO:{
		id:"ID",
		name:"String",
		queue:"String",
		status:"StatusDTO",
		type:"ServiceType"
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
		deal:"String",
		id:"ID",
		productUrl:"String",
		shop:"ShopDTO",
		updatedOn:"String"
	},
	ID: `scalar.ID` as const
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}