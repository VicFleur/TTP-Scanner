<template>
    <NConfigProvider :locale="itIT" :date-locale="dateItIT" :theme-overrides="themeOverrides" inline-theme-disabled>
        <NuxtLayout>
            <NModalProvider>
                <NuxtPage />
            </NModalProvider>
        </NuxtLayout>
    </NConfigProvider>
</template>

<script lang="ts" setup>
import type { GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, NModalProvider } from 'naive-ui'
import { itIT, dateItIT } from 'naive-ui'

const colorAzure = '#5AC4ED'
const colorAzureLight = '#9DE3F9'
const colorAzureDark = '#327084'
const colorRed = '#E2001A';
const colorOrange = '#f39800';
const colorWarn = '#F7B229';
const colorGray = '#DBDBDE';
const colorVerde = '#e3dd00'
const colorGrayLight = 'rgba(46,51,56,0.05)';
const colorGrayDark = '#7D7D7D';
const colorBorderInput = 'rgb(224, 224, 230)';
const colorGreen = '#009BB0'
const colorGreenHover = '#009BB0'
const colorGreenPressed = '#009BB0'
const colorTextDefault = '#1A1B3A'
const colorTextDefaultHover = '#000000'
const colorTextContrast = '#FFFFFF'
const colorBackgroundPage = '#F0F1F3'

const themeOverrides = <GlobalThemeOverrides>{
    common: {
        bodyColor: colorBackgroundPage,
        successColor: colorGreen,
        errorColor: colorRed,
        fontFamily: "'Switzer', 'Switzer override', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'",

        primaryColor: colorAzure
    },
    Button: {
        heightLarge: '54px',
        heightMedium: '40px',
        heightSmall: '40px',
        paddingMedium: '0 0',
        paddingRoundLarge: '0 25px',
        paddingRoundSmall: '0 18px',
        paddingSmall: '0 18px',

        color: colorGrayLight,
        colorHover: colorGray,
        colorFocus: colorGray,
        colorPressed: colorGrayLight,
        colorPrimary: colorAzure,
        colorHoverPrimary: colorAzureLight,
        colorFocusPrimary: colorAzureLight,
        colorPressedPrimary: colorAzure,
        colorSecondary: 'white',
        colorSecondaryHover: 'white',
        colorSecondaryPressed: 'white',
        colorTertiary: 'transparent',
        colorTertiaryHover: 'transparent',
        colorTertiaryPressed: 'transparent',

        textColor: colorTextDefault,
        textColorHover: colorTextDefaultHover,
        textColorFocus: colorTextDefaultHover,
        textColorPressed: colorTextDefault,
        textColorPrimary: colorTextDefault,
        textColorHoverPrimary: colorTextDefault,
        textColorFocusPrimary: colorTextDefault,
        textColorPressedPrimary: colorTextDefault,
        textColorTertiary: colorAzure,

        colorDisabled: colorGray,
        colorDisabledPrimary: colorGray,
        colorError: colorRed,
        colorHoverError: colorRed,
        colorFocusError: colorRed,
        colorPressedError: colorRed,
        colorWarning: colorWarn,
        colorHoverWarning: colorOrange,
        colorFocusWarning: colorWarn,
        colorPressedWarning: colorOrange,

        textColorSuccess: colorTextDefault,
        textColorHoverSuccess: colorTextDefaultHover,
        textColorFocusSuccess: colorTextDefault,
        textColorGhostPressedSuccess: colorTextDefaultHover,
        colorSuccess: colorGreen,
        colorHoverSuccess: colorGreenHover,
        colorFocusSuccess: colorGreen,
        colorPressedSuccess: colorGreenPressed,
        textColorError: colorTextContrast,
        textColorHoverError: colorTextContrast,
        textColorFocusError: colorTextContrast,
        textColorGhostPressedError: colorTextContrast,
        textColorWarning: colorTextDefault,
        textColorHoverWarning: colorTextDefaultHover,
        textColorFocusWarning: colorTextDefault,
        textColorGhostPressedWarning: colorTextDefaultHover,

        textColorDisabled: colorGrayDark,
        textColorDisabledPrimary: colorGrayDark,

        borderRadiusLarge: '12px',
        borderRadiusSmall: '20px',

        fontWeight: 700,
        fontSizeLarge: '0.941rem', // 16px
        fontSizeMedium: '0.941rem', // 16px
        fontSizeSmall: '0.882rem', // 15px

        textColorGhost: colorTextDefault,
        textColorGhostHover: colorTextDefault,
        textColorGhostPressed: colorTextDefault,
        textColorGhostFocus: colorTextDefault,

        //border: '2px solid var(--color-text-default)',
        border: 'none',
        borderPrimary: 'none',
        borderWarning: 'none',
        borderSuccess: 'none',
        borderError: 'none',
        borderDisabled: 'none',
        borderDisabledPrimary: 'none',
        borderFocus: 'none',
        borderFocusPrimary: 'none',
        borderFocusWarning: 'none',
        borderFocusSuccess: 'none',
        borderFocusError: 'none',
        borderPressed: 'none',
        borderPressedPrimary: 'none',
        borderPressedWarning: 'none',
        borderPressedSuccess: 'none',
        borderPressedError: 'none',
        borderHover: 'none',
        borderHoverPrimary: 'none',
        borderHoverWarning: 'none',
        borderHoverSuccess: 'none',
        borderHoverError: 'none'

    },
    Input: {
        heightLarge: '54px',
        paddingLarge: '0 20px',

        textColor: colorTextDefault,

        borderRadius: '12px',
        border: 'none',
        borderHover: 'none',
        borderFocus: 'none',

        fontSizeLarge: '0.941rem', // 16px
    },
    Select: {
        peers: {
            InternalSelection: {
                heightLarge: '54px',
                paddingSingle: '0 20px',

                textColor: colorTextDefault,

                fontSizeLarge: '0.941rem', // 16px

                borderRadius: '12px',

                border: `1px solid ${colorBorderInput}`,
                borderHover: `1px solid ${colorBorderInput}`,
                borderFocus: `1px solid ${colorBorderInput}`,
            },
            InternalSelectMenu: {

                //groupHeaderTextColor: colorAzureDark,

                optionTextColor: colorTextDefault,
                optionTextColorActive: colorAzureDark,

                optionFontSizeLarge: '0.941rem', // 16px

                borderRadius: '12px',
            }
        }
    },
    Radio: {
        buttonColor: 'transparent',
        buttonColorActive: colorAzure,

        buttonTextColor: colorTextDefault,
        buttonTextColorHover: colorTextDefault,
        buttonTextColorActive: 'white',

        dotColorActive: colorAzureDark,
        boxShadowActive: `inset 0 0 0 1px ${colorAzureDark}`,
        boxShadowHover: `inset 0 0 0 1px ${colorAzureDark}`,
        boxShadowFocus: `inset 0 0 0 1px ${colorAzureDark}`,

        fontSizeLarge: '0.941rem', // 16px
    },
    Tag: {
        fontWeightStrong: 700
    },
    Checkbox: {
        colorChecked: colorAzureDark,

        boxShadowFocus: 'none',

        textColor: colorTextDefault,
        textColorHover: colorTextDefault,
        textColorActive: colorTextDefault,
    },
    Dialog: {
        textColor: colorTextDefault,
        titleTextColor: colorTextDefault,
        closeColorHover: 'white',
        closecolorAzurePressed: 'white',
        //iconColorWarning: colorPeach,

        iconSize: '36px',
        padding: 'var(--margin-double)',
        //contentMargin: '8px 0px 40px 0px'

        borderRadius: '12px'
    },
    Tabs: {
        tabTextColorActiveLine: colorAzureDark,
        tabTextColorHoverLine: colorAzureDark,

        tabFontWeight: 700,
        tabFontWeightActive: 700
    },
    Collapse: {
        titleFontWeight: 700
    },
    Dropdown: {
        optionTextColor: colorTextDefault,
        fontSizeMedium: '0.941rem', // 16px
    },
    Switch: {
        buttonBoxShadow: 'none',
        railWidthLarge: '42px',
        buttonWidthLarge: '20px',
        buttonHeightLarge: '20px',
    },
    Pagination: {
        itemSizeMedium: '40px',
        itemBorderRadius: '20px',
        itemTextColorActive: colorTextDefault,
        itemTextColorHover: colorTextDefault,
        itemColorHover: colorGrayLight,
        itemColorActive: colorAzure,
        itemColorActiveHover: colorAzure,
        itemColorDisabled: 'transparent',
        itemTextColorDisabled: colorGrayDark,
        itemBorderActive: 'none',
        itemBorderDisabled: 'none',
        buttonColor: 'transparent',
        buttonColorHover: colorGrayLight,
        buttonColorPressed: colorGrayLight,
        buttonColorFocus: colorGrayLight,
        buttonColorDisabled: 'transparent',
        buttonBorder: 'none',
        buttonBorderHover: 'none',
        buttonBorderPressed: 'none',
        buttonIconColor: colorTextDefault,
        buttonIconColorHover: colorTextDefault,
        buttonIconColorPressed: colorTextDefault
    },
    DataTable: {
        borderColor: colorBorderInput,
        fontSizeMedium: '0.941rem', // 16px
        borderRadius: '12px',
    },
    DatePicker: {
        panelBorderRadius: '12px',
        calendarDaysDividerColor: 'transparent',

        calendarLeftPaddingDaterange: '12px',
        calendarRightPaddingDaterange: '12px',

        panelActionDividerColor: colorBorderInput,
        panelActionPadding: '12px',

        itemFontSize: '0.875rem',
        itemColorActive: colorAzureDark,
        itemColorIncluded: colorGrayLight,
        itemTextColorDisabled: '#999',
        itemSize: '30px',

        arrowColor: colorTextDefault,
        iconColor: '#929292',
        arrowSize: '18px'
    },
    TimePicker: {
        panelActionPadding: '12px',
        itemFontSize: '0.875rem',
        itemTextColorActive: 'white'
    }
}

useSeoMeta({
    formatDetection: 'telephone=no',
    themeColor: '#F0F1F3'
})
</script>