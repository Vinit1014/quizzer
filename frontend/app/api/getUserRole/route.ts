import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { userMail } = body;

    // Ensure userId is provided
    if (!userMail) {
      return NextResponse.json({ error: 'User mail is required' }, { status: 400 });
    }

    // Fetch the user's role from the database
    const user = await prisma.user.findUnique({
      where: { email: userMail },
    });
    
    // Check if user was found
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    console.log("Fetched user "+user);
    
    // Return the user's role
    return NextResponse.json({ user: user });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the user role' }, { status: 500 });
  }
}
