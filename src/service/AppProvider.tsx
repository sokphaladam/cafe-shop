"use client";
import { CustomToastMultiple } from "@/components/custom/CustomToast";
import { PolarisProvider } from "./PolarisProvider";
import { UserProvider } from "./UserProvider";
import { ApolloWrapper } from "./ApolloProvider";
import { LanguageProvider } from "./LanguageProvider";

export function AppProvider({ children }: React.PropsWithChildren<any>) {
  return (
    <ApolloWrapper>
      <LanguageProvider>
        <UserProvider>
          <PolarisProvider>
            <CustomToastMultiple>{children}</CustomToastMultiple>
          </PolarisProvider>
        </UserProvider>
      </LanguageProvider>
    </ApolloWrapper>
  );
}