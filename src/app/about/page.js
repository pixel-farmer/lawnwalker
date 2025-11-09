'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20 bg-white" style={{ backgroundColor: '#ffffff' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-12 md:gap-16"
      >

        {/* Content */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-xl md:text-xl font-bold text-gray-500 mb-6 tracking-tight font-headline">
              Biography
            </h1>
            <div className="space-y-4 text-gray-500 font-light leading-relaxed text-base md:text-lg">
              <p>
              Lawn Walker creates paintings that inhabit the delicate space between innocence and unease. Her figures—often children paired with symbolic animals—stand with a calm, almost solemn presence, as if caught in the middle of a story the viewer has just stepped into. Through muted palettes, subtle textures, and an economy of gesture, Walker draws out the quiet emotional undercurrents that linger beneath memory, identity, and the inner life.</p>
              <p>
              Influenced by folk imagery, early portraiture, and psychological narrative, her work blends the familiar with the uncanny. Each character appears both vulnerable and self-possessed, inviting the viewer into a world where tenderness and mystery coexist. The animals they hold—rabbits, crows, and other companions—act as emotional echoes or symbolic guides, deepening the painting’s sense of story and atmosphere.</p>
              <p>Walker’s process is grounded in layered surfaces and a restrained, intentional mark-making that gives each piece a worn, timeless quality. Rather than relying on spectacle, she builds resonance through subtlety: the tilt of a head, the stillness of a gaze, the quiet tension between subject and setting.</p>
            </div>
          </div>

          <div>
          <h1 className="text-xl md:text-xl font-bold text-gray-500 mb-6 tracking-tight font-headline">
              Exhibitions
            </h1>
            <div className="space-y-4 text-gray-500 font-light leading-relaxed text-base md:text-lg">
          <p>February 2013 – Linus Gallery, Pasadena, CA (Gallery Group Show)</p>
          <p>November 2012 – Linus Gallery, Pasadena, CA (Online Group Show)</p>
          <p>August 2012 – Delaware Division of Arts, Mezzanine Gallery, Wilmington, DE (Solo show)</p>
          <p>February 2011 – The Dirty Show 12, Detroit, MI (Group show)</p>
          <p>September 2010 – Studio 807, Wilmington, DE (Solo show)</p>
          <p>July 2 – October 24, 2010 – Biggs Museum, Dover, DE (Award Winners X and Reunion show of the Delaware Division of the Arts (DDOA) fellowship winners)</p>
          <p>May 2010 – Red Mohawk, Wilmington, DE (Group show)</p>
          <p>December 2009 – 205 Lavinia Street, Milton, DE (Group show)</p>
          <p>October 2009 – Amandeline Gallery, Rehoboth, DE (Group show)</p>
          <p>April 2009 – AB&amp;C Advertising Agency, Wilmington, DE (Group show)</p>
          <p>March 2007 – Fish On!, Lewes, DE (Solo show)</p>
          <p>March 2007 – Amandeline Gallery, Rehoboth, DE (Group show)</p>
          <p>November 2006 – Delaware Division of Arts, Mezzanine Gallery, Wilmington, DE (Solo show)</p>
          <p>June 2006 – Biggs Museum, Dover, DE (group show of the Delaware Division of the Arts (DDOA) fellowship winners)</p>
          <p>March 2006 – DCOR, Rehoboth Beach, DE (Solo show)</p>
          <p>December 2005 – February 2006 – AIPH,  Philadelphia, PA (Group show)</p>
          <p>October 2005 - 205 Lavinia Street, Milton, DE (Solo show)</p>
          <p>March 2005 - 205 Lavinia Street, Milton, DE (Solo show)</p>
          </div>
          </div>

          {/* Contact Section */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-500 mb-6 font-headline">Contact</h2>
            <form
              action="https://formsubmit.co/cassie@pixel-farmers.com"
              method="POST"
              className="space-y-5 max-w-md"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://lawnwalker.vercel.app/thank-you" />

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-light">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-light">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded focus:outline-none focus:border-gray-500 transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 font-light">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  className="w-full bg-white text-gray-900 border border-gray-300 px-4 py-2.5 rounded focus:outline-none focus:border-gray-500 transition-colors font-light resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded transition-colors font-light text-sm tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Shop Link */}
          <div className="pt-4">
            <Link 
              href="https://lawnwalker.etsy.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light underline"
            >
              View Shop →
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
