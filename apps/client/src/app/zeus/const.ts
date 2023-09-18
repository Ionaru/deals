/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	DealSortChoices: "enum" as const,
	Mutation:{
		startScraper:{

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
		startScraper:"Boolean"
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
		deal:"DealDTO",
		deals:"DealPaginatedType",
		service:"ServiceHealthDTO",
		services:"ServiceHealthDTO"
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
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}