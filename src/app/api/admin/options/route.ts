import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Options } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {
      try {
            const addOption = request.nextUrl.searchParams.get('option')
            if (addOption) {
                  const option = JSON.parse(addOption)
                  const optiontype = option.type
                  if (optiontype === 'card') {
                        const document = await Options.findOneAndUpdate({ id: 'options' })
                        const cards = document.cards.push(option)
                        console.log(cards)
                  }
            }
            const options = await Options.findOne({ id: 'options' })
            const siteOptions = options.sites
            const cardOptions = options.cards
            console.log(options)
            if (options) {
                  return NextResponse.json({
                        message: 'something went wrong', success: true, data: { siteOptions, cardOptions }
                  })
            }
      } catch {
            return NextResponse.json({
                  message: 'something went wrong', success: false
            })
      }
}