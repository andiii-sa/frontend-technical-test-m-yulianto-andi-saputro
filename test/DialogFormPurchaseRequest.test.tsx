import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/components/base/BaseSelect", () => ({
    default: ({ items, value, onValueChange, placeholder, name, disabled }: any) => (
        <select
            data-testid={name}
            value={value ?? ""}
            name={name}
            disabled={disabled}
            onChange={(e) => onValueChange(e.target.value)}
        >
            <option value="">{placeholder}</option>
            {items.map((item: any) => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    ),
}));

import DialogFormPurchaseRequest from "@/features/purchase-requests/DialogFormPurchaseRequest";

const handleSubmit = vi.fn();

const renderForm = () =>
    render(
        <DialogFormPurchaseRequest
            open
            type="ADD"
            handleSubmit={handleSubmit}
            handleClose={vi.fn()}
            handleApprove={vi.fn()}
            handleReject={vi.fn()}
        />,
    );

beforeEach(() => {
    handleSubmit.mockClear();
});

describe("DialogFormPurchaseRequest - create", () => {
    it("submit dengan data lengkap: handleSubmit dipanggil dengan payload yang benar", async () => {
        const user = userEvent.setup();
        renderForm();

        await user.selectOptions(screen.getByTestId("warehouseId"), "1");
        await user.selectOptions(screen.getByTestId("product.0.productId"), "1");
        await user.type(screen.getByPlaceholderText("Qty"), "5");
        await user.type(screen.getByPlaceholderText("Add request notes..."), "urgent");

        expect(screen.getByPlaceholderText("Unit")).toHaveValue("PCS");

        await user.click(screen.getByRole("button", { name: "Submit for Approval" }));

        await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
        expect(handleSubmit).toHaveBeenCalledWith(
            {
                warehouseId: "1",
                notes: "urgent",
                product: [{ productId: "1", productQty: 5, productUnit: "PCS" }],
            },
            false,
        );
    });

    it("submit dengan field kosong: handleSubmit tidak dipanggil dan error tampil", async () => {
        const user = userEvent.setup();
        renderForm();

        await user.click(screen.getByRole("button", { name: "Submit for Approval" }));

        expect(await screen.findByText("Please select a warehouse")).toBeInTheDocument();
        expect(screen.getByText("Please select a product")).toBeInTheDocument();
        expect(screen.getByText("Quantity must be at least 1")).toBeInTheDocument();
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it("submit dengan warehouse terisi tapi qty kosong: tetap tidak bisa save", async () => {
        const user = userEvent.setup();
        renderForm();

        await user.selectOptions(screen.getByTestId("warehouseId"), "1");
        await user.selectOptions(screen.getByTestId("product.0.productId"), "1");

        await user.click(screen.getByRole("button", { name: "Submit for Approval" }));

        expect(await screen.findByText("Quantity must be at least 1")).toBeInTheDocument();
        expect(handleSubmit).not.toHaveBeenCalled();
    });
});
