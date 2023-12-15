import { Theme } from '@/shared/const/theme';
import { SideBarState } from '@/shared/types/sidebar';

export interface JsonSettings {
    theme?: Theme;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
    isArticlesPageWasOpend?: boolean;
    sideBarState?: SideBarState;
}
