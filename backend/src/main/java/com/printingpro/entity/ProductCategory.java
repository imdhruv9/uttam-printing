package com.printingpro.entity;

/**
 * Enum representing different product categories offered by the printing press.
 * FLEX_PRINTING - Priced per square feet
 * PAMPHLET - Priced per piece
 */
public enum ProductCategory {
    FLEX_PRINTING("Flex Printing"),
    PAMPHLET("Pamphlet");

    private final String displayName;

    ProductCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}

