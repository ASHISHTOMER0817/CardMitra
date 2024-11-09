import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Transactions, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const transactionId = body.transactionID;
        const newAmount = parseFloat(body.newAmt || '0');

        console.log('body: ', body);
        
        
        if (!transactionId || !newAmount) {
            return NextResponse.json({
                message: "Transaction ID and new amount are required", success: false
            });
        }

        // Fetch the transaction
        const transaction = await Transactions.findOne({ _id: transactionId });
        if (!transaction) {
            return NextResponse.json({
                message: "Transaction not found", success: false
            });
        }

        // Get old amount and calculate the difference
        const oldTransactionAmount = transaction.amount;
        const change_in_transaction_amount = newAmount - oldTransactionAmount;

        // Update the transaction amount
        transaction.amount = newAmount;
        await transaction.save();

        // Update user paid/unpaid balances
        const user = await User.findOne({ _id: transaction.user });
        if (!user) {
            return NextResponse.json({
                message: "User not found", success: false
            });
        }

        user.paid += change_in_transaction_amount;
        user.unpaid -= change_in_transaction_amount;

        // Save the user with updated balances
        await user.save();

        // const userTransactions = await Transactions.find({ user: user }).sort({ dateOfPayment: -1 })

        return NextResponse.json({
            message: "Transaction updated successfully", success: true,
            data: { user, updatedTransaction: transaction, status: 200 }
        });
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong, please try again later", success: false
        });
    }
}
