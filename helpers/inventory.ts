const MOVEMENT_TYPE_LABEL: Record<string, string> = {
    PURCHASE_RECEIPT: "Purchase Receipt",
};

export const formatMovementType = (type: string) => {
    return (
        MOVEMENT_TYPE_LABEL[type] ??
        type
            .toLowerCase()
            .split("_")
            .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
            .join(" ")
    );
}

export const formatSignedQuantity = (qty: number) => {
    const n = new Intl.NumberFormat("id-ID").format(Math.abs(qty));
    if (qty > 0) return `+${n}`;
    if (qty < 0) return `−${n}`;
    return n;
}