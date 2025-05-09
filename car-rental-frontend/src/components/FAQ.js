import React from "react";
const FAQ = () => {
    return (
      <div className="text-center py-16">
        <h2 className="text-4xl font-bold">Have Any Questions?</h2>
        <div className="mt-8 w-3/4 mx-auto">
          {['How do I find a car or bike?', 'How can I extend my trip?', 'Am I responsible for fuel?', 'How can I apply for promo codes?'].map((question) => (
            <div key={question} className="border-b py-4 text-left">
              <p className="font-bold">{question}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default FAQ;
  