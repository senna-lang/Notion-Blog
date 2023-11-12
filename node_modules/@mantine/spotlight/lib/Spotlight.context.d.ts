/// <reference types="react" />
import { GetStylesApi } from '@mantine/core';
import type { SpotlightRootFactory } from './SpotlightRoot';
import { SpotlightStore } from './spotlight.store';
interface SpotlightContextValue {
    query: string;
    setQuery(query: string): void;
    getStyles: GetStylesApi<SpotlightRootFactory>;
    store: SpotlightStore;
    closeOnActionTrigger: boolean | undefined;
}
export declare const SpotlightProvider: ({ children, value }: {
    value: SpotlightContextValue;
    children: import("react").ReactNode;
}) => import("react/jsx-runtime").JSX.Element, useSpotlightContext: () => SpotlightContextValue;
export {};
//# sourceMappingURL=Spotlight.context.d.ts.map