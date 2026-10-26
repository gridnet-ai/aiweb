import { useState } from 'react';
import { Check, ClipboardCopy, Printer } from 'lucide-react';
import { GEEKDOM_PRINTER_IP } from '@/components/corp/GeekdomMacGuide';

const DRIVER_NAME = 'RICOH PS UniversalDriver V4.46';
const DRIVER_URL =
  'https://support.ricoh.com/bb/html/dr_ut_e/rc3/model/imc4500/imc4500.htm';

const WIN_SETTINGS: { field: string; value: string }[] = [
  { field: 'Device type', value: 'TCP/IP Device' },
  { field: 'Hostname or IP address', value: GEEKDOM_PRINTER_IP },
  { field: 'Port name', value: `${GEEKDOM_PRINTER_IP}_1 (auto)` },
  { field: 'Query printer', value: 'Checked' },
  { field: 'Driver', value: DRIVER_NAME },
  { field: 'Have Disk path', value: 'C:\\temp\\z07513L24\\disk1' },
];

function Shot({
  src,
  alt,
  caption,
  zoom,
}: {
  src: string;
  alt: string;
  caption: string;
  zoom?: boolean;
}) {
  return (
    <figure className={['gdmac-shot', zoom ? 'gdmac-shot--zoom' : ''].join(' ')}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function GeekdomWindowsGuide() {
  const [ipCopied, setIpCopied] = useState(false);

  const onCopyIp = async () => {
    const ok = await copyText(GEEKDOM_PRINTER_IP);
    if (!ok) return;
    setIpCopied(true);
    window.setTimeout(() => setIpCopied(false), 2000);
  };

  return (
    <article className="gdmac">
      <header className="gdmac-header">
        <h2 className="gdmac-title">How to Connect a Windows PC to the Ricoh Printer</h2>
        <p className="gdmac-intro">
          These instructions are for Windows 10 and Windows 11 at Geekdom. You need Wi‑Fi access and
          admin rights to install a printer driver — about five minutes.
        </p>
      </header>

      <div className="gdmac-ip-card">
        <div className="gdmac-ip-icon" aria-hidden="true">
          <Printer size={28} strokeWidth={1.75} />
        </div>
        <div className="gdmac-ip-body">
          <p className="gdmac-ip-name">Ricoh Network Printer</p>
          <p className="gdmac-ip-label">Printer IP address</p>
          <div className="gdmac-ip-row">
            <p className="gdmac-ip-value">{GEEKDOM_PRINTER_IP}</p>
            <button type="button" className="gdmac-copy-ip" onClick={() => void onCopyIp()}>
              {ipCopied ? <Check size={16} aria-hidden="true" /> : <ClipboardCopy size={16} aria-hidden="true" />}
              {ipCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="gdmac-ip-meta">
            Driver: <code>{DRIVER_NAME}</code>
          </p>
        </div>
      </div>

      <ol className="gdmac-steps">
        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 1</span> Connect to Geekdom Wi‑Fi
          </h3>
          <p>
            Join Geekdom Wi‑Fi. Password: <code>Geekdom1100</code>. The printer IP{' '}
            <code>{GEEKDOM_PRINTER_IP}</code> is only reachable on that network.
          </p>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 2</span> Download the Ricoh PS driver
          </h3>
          <p>
            Open the{' '}
            <a href={DRIVER_URL} target="_blank" rel="noopener noreferrer">
              Ricoh IM C4500/C6000 downloads page
            </a>{' '}
            and download <strong>PS Driver for Universal Print</strong> (Ver. 4.46) — marked New.
            Skip PCL and the older PS V4 driver.
          </p>
          <p className="gdmac-note">File size is about 34 MB.</p>
          <div className="gdmac-shots">
            <Shot
              src="/images/geekdom/00-download-driver.png"
              alt="Ricoh support page listing drivers for IM C4500 including PS Driver for Universal Print"
              caption="support.ricoh.com — IM C4500 → PS Driver for Universal Print Ver.4.46"
            />
            <Shot
              src="/images/geekdom/00b-download-driver-zoom.png"
              alt="Zoomed view of PS Driver for Universal Print download button"
              caption="Zoomed in — select PS Driver for Universal Print (Ver.4.46) and Download"
              zoom
            />
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 3</span> Unzip the driver package
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/01-unzip-driver.png"
              alt="WinZip Self-Extractor unzipping z07513L24.exe to c:\\temp\\z07513L24"
              caption="WinZip Self-Extractor → Unzip to c:\\temp\\z07513L24"
            />
            <ol className="gdmac-list">
              <li>
                Run the downloaded installer (<code>z07513L24.exe</code>).
              </li>
              <li>
                Leave the folder as <code>c:\temp\z07513L24</code>.
              </li>
              <li>Keep “Overwrite files without prompting” checked.</li>
              <li>
                Click <strong>Unzip</strong>.
              </li>
            </ol>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 4</span> Open Printers &amp; scanners
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/02-printers-scanners.png"
              alt="Windows Settings Printers and scanners with Add device button"
              caption="Windows Settings — Add a printer or scanner"
            />
            <ol className="gdmac-list">
              <li>
                Open <strong>Settings → Bluetooth &amp; devices → Printers &amp; scanners</strong>.
              </li>
              <li>
                Click <strong>Add device</strong>.
              </li>
            </ol>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 5</span> Add the printer manually
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/03-add-manually.png"
              alt="Windows prompt The printer that I want isn’t listed with Add a new device manually"
              caption="Add a new device manually"
            />
            <ol className="gdmac-list">
              <li>
                When search finishes, choose <strong>The printer that I want isn’t listed</strong>.
              </li>
              <li>
                Click <strong>Add a new device manually</strong>.
              </li>
            </ol>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 6</span> Add by IP address
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/05-add-by-ip.png"
              alt="Add Printer wizard with Add a printer using an IP address or hostname selected"
              caption="Find a printer by other options → IP address or hostname"
            />
            <ol className="gdmac-list">
              <li>
                Select <strong>Add a printer using an IP address or hostname</strong>.
              </li>
              <li>
                Click <strong>Next</strong>.
              </li>
            </ol>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 7</span> Enter the Geekdom printer IP
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/07-hostname-ip.png"
              alt={`Add Printer hostname field set to ${GEEKDOM_PRINTER_IP}`}
              caption={`Hostname or IP address: ${GEEKDOM_PRINTER_IP}`}
            />
            <div>
              <p>Use these values, then click Next:</p>
              <div className="gdmac-table-wrap">
                <table className="gdmac-table">
                  <thead>
                    <tr>
                      <th scope="col">Field</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WIN_SETTINGS.slice(0, 4).map((row) => (
                      <tr key={row.field}>
                        <th scope="row">{row.field}</th>
                        <td>
                          {row.field.includes('IP') || row.value === GEEKDOM_PRINTER_IP ? (
                            <code>{row.value}</code>
                          ) : (
                            row.value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 8</span> Install the driver with Have Disk…
          </h3>
          <p>
            Don’t pick a random model from the list. Click <strong>Have Disk…</strong> and point
            Windows at the files you unzipped.
          </p>
          <div className="gdmac-shots gdmac-shots--pair">
            <Shot
              src="/images/geekdom/08-install-driver-list.png"
              alt="Install the printer driver window with Have Disk button"
              caption="Install the printer driver → Have Disk…"
            />
            <Shot
              src="/images/geekdom/09-install-from-disk.png"
              alt="Install From Disk dialog pointing to C:\\temp\\z07513L24\\disk1"
              caption="Copy manufacturer’s files from C:\\temp\\z07513L24\\disk1"
            />
          </div>
          <div className="gdmac-table-wrap">
            <table className="gdmac-table">
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {WIN_SETTINGS.slice(4).map((row) => (
                  <tr key={row.field}>
                    <th scope="row">{row.field}</th>
                    <td>
                      <code>{row.value}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 9</span> Select the Ricoh universal driver
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/10-select-ricoh.png"
              alt="Ricoh manufacturer selected with RICOH PS UniversalDriver V4.46 highlighted"
              caption={`Ricoh → ${DRIVER_NAME}`}
            />
            <ol className="gdmac-list">
              <li>
                Manufacturer: <strong>Ricoh</strong>
              </li>
              <li>
                Printer: <strong>{DRIVER_NAME}</strong>
              </li>
              <li>
                Click <strong>Next</strong>
              </li>
            </ol>
          </div>
          <div className="gdmac-shots">
            <Shot
              src="/images/geekdom/11-use-current-driver.png"
              alt="Which version of the driver dialog with Use the driver that is currently installed selected"
              caption="Use the driver that is currently installed (recommended)"
            />
          </div>
          <p className="gdmac-note">
            If Windows says a driver is already installed, keep the recommended option unless you’re
            fixing a bad install — then choose Replace.
          </p>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 10</span> Name, share, and finish
          </h3>
          <div className="gdmac-shots gdmac-shots--pair">
            <Shot
              src="/images/geekdom/12-printer-name.png"
              alt="Type a printer name dialog for RICOH PS UniversalDriver V4.46"
              caption="Type a printer name"
            />
            <Shot
              src="/images/geekdom/13-printer-sharing.png"
              alt="Printer Sharing dialog in the Add Printer wizard"
              caption="Printer Sharing (optional)"
            />
          </div>
          <ol className="gdmac-list">
            <li>Accept the default name or enter a clear label, then Next.</li>
            <li>
              Share only if others should find the printer from your PC; otherwise choose{' '}
              <strong>Do not share this printer</strong>.
            </li>
          </ol>
        </li>

        <li className="gdmac-step">
          <h3 className="gdmac-step-title">
            <span>Step 11</span> Print a test page
          </h3>
          <div className="gdmac-split">
            <Shot
              src="/images/geekdom/14-success.png"
              alt="You’ve successfully added RICOH PS UniversalDriver with Print a test page button"
              caption={`Successfully added ${DRIVER_NAME}`}
            />
            <ol className="gdmac-list">
              <li>
                Click <strong>Print a test page</strong>.
              </li>
              <li>
                Click <strong>Finish</strong>.
              </li>
            </ol>
          </div>
          <p className="gdmac-success">
            If the test page prints, setup is successful — you’re ready to print from Geekdom on
            Windows.
          </p>
        </li>
      </ol>

      <p className="gdmac-ref">
        Driver download:{' '}
        <a href={DRIVER_URL} target="_blank" rel="noopener noreferrer">
          Ricoh IM C4500/C6000 — PS Driver for Universal Print
        </a>
      </p>
    </article>
  );
}
