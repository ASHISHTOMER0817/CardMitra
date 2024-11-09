import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Card, Options, Site, User } from "@/models/userModel";

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

            const collaborators = (await User.find({ role: 'collaborator', isApprove: true }).select('id name')).map(collaborator => ({
                  value: collaborator.id,
                  label: collaborator.name,
            }));

            
            return NextResponse.json({
                  message: 'something went wrong', success: true, data: { sites, cards, collaborators }
            })
            
      } catch {
            return NextResponse.json({
                  message: 'something went wrong', success: false
            })
      }
}