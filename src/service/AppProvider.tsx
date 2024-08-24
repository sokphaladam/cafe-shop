"use client";
import { CustomToastMultiple } from "@/components/custom/CustomToast";
import { PolarisProvider } from "./PolarisProvider";
import { UserProvider } from "./UserProvider";
import { ApolloWrapper } from "./ApolloProvider";
import { LanguageProvider } from "./LanguageProvider";
import { NetworkProvider } from "./NetworkProvider";

export function AppProvider({ children }: React.PropsWithChildren<any>) {
  return (
    <NetworkProvider>
      <ApolloWrapper>
        <LanguageProvider>
          <UserProvider>
            <PolarisProvider>
              <CustomToastMultiple>{children}</CustomToastMultiple>
            </PolarisProvider>
          </UserProvider>
        </LanguageProvider>
      </ApolloWrapper>
    </NetworkProvider>
  );
}