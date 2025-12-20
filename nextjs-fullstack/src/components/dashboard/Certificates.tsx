import { Certificate } from "@/utils/data/user";

interface CertificatesProps {
  certificates: Certificate[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Certifications</h2>
        <span className="text-sm text-slate-600">{certificates.length} total</span>
      </div>
      
      {certificates.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <p className="text-sm text-slate-600">No certificates yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
              {/* Certificate Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              
              {/* Certificate Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {cert.credentialUrl ? (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
                      {cert.title}
                      <svg className="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    cert.title
                  )}
                </h3>
                
                {cert.issuer && (
                  <p className="text-sm text-slate-600 mb-2">{cert.issuer}</p>
                )}
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  {cert.issueDate && (
                    <span>
                      Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  )}
                  {cert.expiryDate && (
                    <span>
                      Expires: {new Date(cert.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  )}
                  {cert.credentialId && (
                    <span className="font-mono">ID: {cert.credentialId}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
