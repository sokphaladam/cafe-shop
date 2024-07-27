"use client";
import { CustomToastMultiple } from "@/components/custom/CustomToast";
import { PolarisProvider } from "./PolarisProvider";
import { UserProvider } from "./UserProvider";
import { ApolloWrapper } from "./ApolloProvider";

export function AppProvider({ children }: React.PropsWithChildren<any>) {
  return (
    <ApolloWrapper>
      <UserProvider>
        <PolarisProvider>
          <CustomToastMultiple>{children}</CustomToastMultiple>
        </PolarisProvider>
      </UserProvider>
    </ApolloWrapper>
  );
}