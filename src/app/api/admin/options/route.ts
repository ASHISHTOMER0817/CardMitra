import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Card, Options, Site } from "@/models/userModel";

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
                        // console.log(cards)
                  }
            }
            // const options = await Options.findOne({ id: 'options' })

            const sites = await Site.find({}).select('value label');
            const cards = await Card.find({}).select('value label');
            // const siteOptions = 
            // const cardOptions = 
            // console.log(sites, cards)
                  return NextResponse.json({
                        message: 'something went wrong', success: true, data: { sites, cards }
                  })
            
      } catch {
            return NextResponse.json({
                  message: 'something went wrong', success: false
            })
      }
}