import React from 'react';

const Subscription = () => {
  return (
    <div id="subscription" className="bg-white w-screen py-24">
      <h1 className="text-3xl pl-8">Subscription</h1>
      <div className="flex flex-col gap-4 md:flex-row justify-around items-center w-full px-8 py-4">
        <div className=" w-[370px] h-[550px] bg-[#E7E7E7] rounded-2xl p-4 border-2 border-black flex flex-col gap-3">
          <div className="w-full  flex justify-between items-center">
            <h1 className="text-2xl">Freemium</h1>
            <h1 className="text-2xl">₹0.00</h1>
          </div>
          <div className="w-full ">
            <div>
              <ol className="text-sm">
                <li>
                  Key Features:
                  <ul>
                    <li>
                      Free Access: Enjoy basic features such as AI chatbot
                      symptom inquiries and skin analysis at no cost.
                    </li>
                    <li>
                      Upgrade for More: Upgrade to a premium subscription for
                      access to advanced features like doctor chat support,
                      personalized treatment recommendations, and progress
                      tracking.
                    </li>
                    <li>
                      Ideal for:
                      <ul>
                        <li>
                          Users who want to explore and experience the platform
                          before committing to premium services.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Pricing:
                  <ul>
                    <li>Free Version: Basic features at no charge.</li>
                    <li>
                      Premium Subscription: Monthly or annual subscription fees
                      apply for full access.
                    </li>
                  </ul>
                </li>
                <li>
                  Benefits:
                  <ul>
                    <li>Access to essential AI and ML-based skin analysis.</li>
                    <li>
                      Opportunity to test and understand the platform&apos;s
                      capabilities.
                    </li>
                    <li>
                      Flexibility to upgrade as needed for a comprehensive
                      skincare experience.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className=" w-[370px] h-[550px] bg-[#FFD867] rounded-2xl p-4 border-2 border-black flex flex-col gap-3">
          <div className="w-full  flex justify-between items-center">
            <h1 className="text-2xl">Pay Per Use</h1>
            <h1 className="text-2xl">₹50.00</h1>
          </div>
          <div className="w-full ">
            <div>
              <ol className="text-sm">
                <li>
                  Key Features:
                  <ul>
                    <li>
                      Flexible Payment: Pay for services as you use them,
                      including skin analysis and doctor chat consultations.
                    </li>
                    <li>
                      No Commitment: No need for subscriptions; pay only when
                      you need specific services.
                    </li>
                    <li>
                      Ideal for:
                      <ul>
                        <li>
                          Users who prefer a pay-as-you-go model for occasional
                          dermatological support.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Pricing:
                  <ul>
                    <li>
                      Per-Use Pricing: Charges apply for individual services
                      like skin analysis or doctor consultations.
                    </li>
                  </ul>
                </li>
                <li>
                  Benefits:
                  <ul>
                    <li>
                      Cost-effective for users who require occasional
                      dermatological assistance.
                    </li>
                    <li>No long-term commitments or subscription fees.</li>
                    <li>Access premium services when you need them.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className=" w-[370px] h-[550px] bg-[#CBECFF] rounded-2xl p-4 border-2 border-black flex flex-col gap-3">
          <div className="w-full  flex justify-between items-center">
            <h1 className="text-2xl">Premium</h1>
            <h1 className="text-2xl">₹99.00</h1>
          </div>
          <div className="w-full ">
            <div>
              <ol className="text-sm">
                <li>
                  Key Features:
                  <ul>
                    <li>
                      Freemium Access: Access basic features like AI chatbot
                      inquiries and skin analysis for free.
                    </li>
                    <li>
                      One-Time Purchases: Choose from one-time purchase options
                      for specific premium services, such as detailed
                      dermatologist consultations.
                    </li>
                    <li>
                      Ideal for:
                      <ul>
                        <li>
                          Users looking for a mix of free and on-demand premium
                          services.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  Pricing:
                  <ul>
                    <li>Free Version: Basic features at no cost.</li>
                    <li>
                      One-Time Purchases: Pay for premium services individually.
                    </li>
                  </ul>
                </li>
                <li>
                  Benefits:
                  <ul>
                    <li>Explore the platform with free features.</li>
                    <li>
                      Purchase premium services as needed, without subscription
                      commitments.
                    </li>
                    <li>
                      Flexibility to customize your skincare experience based on
                      your unique requirements.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center pt-8">
        <a
          href="/payment"
          className="text-xl border-2 border-black bg-[#76D6FF] hover:bg-[#15B9FF] rounded-full py-2 px-4"
        >
          Subscribe Now
        </a>
      </div>
    </div>
  );
};

export default Subscription;
