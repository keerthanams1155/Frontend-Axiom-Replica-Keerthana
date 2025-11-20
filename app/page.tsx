import { TokenTradingTable } from "@/components/organisms/token-trading-table";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-[16px] md:p-[24px]">
      <div className="mx-auto max-w-[1920px]">
        <h1 className="mb-[24px] text-2xl font-bold text-white">
          Token Discovery
        </h1>
        <TokenTradingTable />
      </div>
    </main>
  );
}

