import { useMutation, useQuery } from "@tanstack/react-query"

import { CompanyControllerFindAllData, CompanyControllerFindOneData, type Options } from "@/api-generated"
import {
	companyControllerCreateMutation,
	companyControllerFindAllOptions,
	companyControllerFindAllQueryKey,
	companyControllerFindOneOptions,
	companyControllerFindOneQueryKey,
	companyControllerRemoveMutation,
	companyControllerUpdateMutation,
} from "@/api-generated/@tanstack/react-query.gen"

export const useGetCompanies = (queryOptions: Options<CompanyControllerFindAllData>) => {
	return {
		...useQuery({
			...companyControllerFindAllOptions({ query: queryOptions.query }),
		}),
		queryKey: companyControllerFindAllQueryKey({ query: queryOptions.query }),
	}
}

export const useGetCompany = (queryOptions: Options<CompanyControllerFindOneData>) => {
	return {
		...useQuery({
			...companyControllerFindOneOptions({ path: queryOptions.path }),
			enabled: !!queryOptions.path,
		}),
		queryKey: companyControllerFindOneQueryKey({ path: queryOptions.path }),
	}
}

export const useCreateCompany = () => {
	const mutationOptions = companyControllerCreateMutation()
	return useMutation({ ...mutationOptions })
}

export const useUpdateCompany = () => {
	const mutationOptions = companyControllerUpdateMutation()
	return useMutation({ ...mutationOptions })
}

export const useDeleteCompany = () => {
	const mutationOptions = companyControllerRemoveMutation()
	return useMutation({ ...mutationOptions })
}

type UseCompanyApiOptions = {
	path?: Options<CompanyControllerFindOneData>["path"]
	query?: Options<CompanyControllerFindAllData>["query"]
}

const useCompanyApi = (options: UseCompanyApiOptions = {}) => {
	const company = useGetCompany({ path: options.path! })
	const companies = useGetCompanies({ query: options.query })
	const createCompany = useCreateCompany()
	const updateCompany = useUpdateCompany()
	const deleteCompany = useDeleteCompany()

	return {
		company,
		companies,
		createCompany,
		updateCompany,
		deleteCompany,
	}
}

export default useCompanyApi
