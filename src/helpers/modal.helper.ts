import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

type ModalHelperFuncType = {
  searchParams: ReadonlyURLSearchParams;
  action: "open" | "close";
  router: AppRouterInstance;
  pathName: String;
  paramName: string;
};

/* This function will take the param name as a parameter and sets it 
to either open or empty. On the modal we can get the param name and
check if it is open or not then based on that we can open or close modal
on the basis of search params */

export const handleModalStateFromURL = ({
  searchParams,
  action,
  router,
  pathName,
  paramName,
}: ModalHelperFuncType) => {
  const newSearchParams = new URLSearchParams(searchParams);

  if (action === "open") {
    newSearchParams.set(paramName, "open");
    router.push(`${pathName}?${newSearchParams.toString()}`);
  }

  if (action === "close") {
    newSearchParams.delete(paramName);
    router.push(`${pathName}?${newSearchParams.toString()}`);
  }
};
