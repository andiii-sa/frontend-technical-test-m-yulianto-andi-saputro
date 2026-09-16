import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { GoodsReceiptDetail as IGoodsReceiptDetail } from "@/types";

import { Button } from "@/components/ui/button";
import { GoodsReceiptDetail } from "./GoodsReceiptDetail";


type DialogDetailGoodsReceiptsProps = {
    open: boolean;
    data?: IGoodsReceiptDetail;
    handleClose: () => void
};

const DialogDetailGoodsReceipts = ({
    open,
    data,
    handleClose
}: DialogDetailGoodsReceiptsProps) => {

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail Goods Receipt</DialogTitle>
                </DialogHeader>
                {data ? (
                    <GoodsReceiptDetail
                        data={data}
                    />
                ) : (
                    <div>Not Found</div>
                )}
                <div className="mt-3 flex justify-end">
                    <Button variant="outline" onClick={() => handleClose()}>
                        Close
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogDetailGoodsReceipts