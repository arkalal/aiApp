import { auth } from "@clerk/nextjs";
import stripe from "../../../../utils/stripe";
import { NextResponse } from "next/server";
import UserSubscription from "../../../../models/userSubscription";
import connectMongoDB from "../../../../utils/mongoDB";
import {
  baseUrlProd,
  baseUrlStaging,
  baseUrlTest,
} from "../../../../axios/baseUrl";

export async function GET(req) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  await connectMongoDB();
  const userSubscription = await UserSubscription.findOne({
    user: userId,
  });

  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: `${baseUrlStaging}/studio`,
    });

    return NextResponse.json(stripeSession.url);
  }
}
