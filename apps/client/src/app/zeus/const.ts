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
	Query:{
		deal:{

		},
		deals:{
			order:"Order",
			sort:"DealSortChoices"
		},
		service:{

		},
		task:{

		},
		user:{

		}
	},
	ServiceType: "enum" as const
}

export const ReturnTypes: Record<string,any> = {
	DealDTO:{
		dealPrice:"Float",
		dealQuantity:"Int",
		id:"ID",
		product:"ProductDTO"
	},
	DealPaginatedType:{
		items:"DealDTO",
		meta:"PaginationMeta"
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
		id:"ID",
		imageUrl:"String",
		name:"String",
		price:"Float",
		productUrl:"String",
		shop:"ShopDTO"
	},
	Query:{
		challenge:"String",
		deal:"DealDTO",
		deals:"DealPaginatedType",
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
		deal:"String",
		id:"ID",
		productUrl:"String",
		shop:"ShopDTO"
	},
	UserDTO:{
		id:"ID",
		isAdmin:"Boolean",
		username:"String"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}