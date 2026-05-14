"use strict";

const INDEX_URL = "https://raw.githubusercontent.com/taffish/taffish-index/main/index/index.json";
const LOCALE_STORAGE_KEY = "taffish_hub_locale";
const LAST_SUCCESS_SYNC_AT_KEY = "taffish_hub_last_success_sync_at";
const LAST_SUCCESS_GENERATED_AT_KEY = "taffish_hub_last_success_generated_at";

const I18N = {
  en: {
    nav_website: "Website",
    nav_github: "GitHub",
    nav_index_repo: "Index Repo",
    nav_trust_report: "Trust Report",
    refresh: "Refresh",
    title: "Package Registry",
    subtitle: "Search apps, inspect versions, and install with deterministic dependencies.",
    metric_packages: "Packages",
    metric_versions: "Versions",
    metric_commands: "Commands",
    metric_repositories: "Repositories",
    metric_failed_gates: "Failed Gates",
    search: "Search package, command, repository",
    kind_all: "All",
    kind_tool: "Tool",
    kind_flow: "Flow",
    sort_name: "Name",
    sort_recent: "Recent",
    filter_deps_only: "Dependencies only",
    filter_container_only: "Container image only",
    section_packages: "Packages",
    section_repositories: "Repositories",
    section_warnings: "Warnings",
    empty_packages: "No package data.",
    empty_repositories: "No repository data.",
    empty_warnings: "No warnings.",
    empty_detail: "Select a package to view details.",
    loading_packages_short: "Loading...",
    loading_packages: "Loading TAFFISH index data...",
    loading_detail: "Package details will appear after the index is loaded.",
    install_commands: "Install Commands",
    detail_versions: "Versions",
    detail_dependencies: "Dependencies",
    detail_platform: "Runtime Requirements",
    detail_overview: "Overview",
    detail_source: "Source",
    detail_runtime_container: "Runtime / Container",
    detail_validation: "Validation",
    detail_upstream: "Upstream",
    group_identity: "Identity",
    group_discovery: "Discovery",
    group_app_source: "App Repository",
    group_release_source: "Release Source",
    group_runtime: "Runtime",
    group_container: "Container Image",
    group_trust: "Trust Gate",
    group_smoke: "Smoke Test",
    note: "Note",
    group_upstream_identity: "Upstream Identity",
    group_upstream_links: "Links",
    group_upstream_reference: "Reference",
    open_repo: "Repository",
    open_source: "Source",
    copy_latest: "Copy latest install command",
    copy_version: "Copy pinned install command",
    copy_chain: "Copy dependency-aware install chain",
    copy_done: "Copied.",
    copy_failed: "Copy failed.",
    retry_sync: "Retry",
    sync_syncing: "Syncing data...",
    sync_done: "Data synced",
    sync_failed: "Sync failed",
    sync_generated: "Index generated",
    sync_last_checked: "Last checked",
    sync_error_detail: "network or permission issue",
    sync_alert_title: "Index sync failed",
    sync_alert_last_success: "Last successful sync",
    sync_alert_never: "No successful sync yet.",
    result_count: "results",
    table_package: "Package",
    table_latest: "Latest",
    table_kind: "Kind",
    table_command: "Command",
    table_dependencies: "Deps",
    table_repository: "Repo",
    table_dependency: "Dependency",
    table_versions: "Versions",
    table_tag: "Tag",
    table_key: "Key",
    table_value: "Value",
    platform_no_constraints: "No explicit OS, architecture, container, CPU, or memory constraints declared.",
    platform_os: "OS",
    platform_arch: "Architecture",
    platform_container: "Container Policy",
    platform_min_cpus: "Minimum CPUs",
    platform_min_memory: "Minimum Memory",
    warning_message: "Message",
    warning_source: "Source",
    label_command: "Command",
    label_repository: "Repository",
    label_tag: "Tag",
    label_license: "License",
    label_description: "Description",
    label_domain: "Domain",
    label_categories: "Categories",
    label_keywords: "Keywords",
    label_source_ref: "Source Ref",
    label_source_commit: "Source Commit",
    label_upstream: "Upstream",
    label_upstream_type: "Upstream Type",
    label_upstream_url: "Upstream URL",
    label_upstream_homepage: "Upstream Homepage",
    label_upstream_repository: "Upstream Repository",
    label_upstream_release_url: "Upstream Releases",
    label_upstream_docker_image: "Upstream Docker Image",
    label_upstream_version: "Upstream Version",
    label_upstream_license: "Upstream License",
    label_upstream_citation: "Upstream Citation",
    label_upstream_doi: "Upstream DOI",
    label_upstream_pmid: "Upstream PMID",
    label_runtime: "Runtime",
    label_main: "Main",
    label_help: "Help",
    label_dockerfile: "Dockerfile",
    label_container_image: "Container Image",
    label_container_tag: "Image Tag",
    label_container_digest: "Image Digest",
    label_container_platforms: "Image Platforms",
    label_container_platform_digests: "Platform Digests",
    label_smoke_status: "Smoke Status",
    label_smoke_backend: "Smoke Backend",
    label_smoke_timeout: "Smoke Timeout",
    label_smoke_exist: "Required Executables",
    label_smoke_test: "Smoke Test Commands",
    label_smoke_checked_at: "Smoke Checked",
    label_trust_status: "Trust Status",
    label_trust_policy: "Trust Policy",
    label_trust_source: "Trust Source",
    label_trust_checked_at: "Trust Checked",
    status_passed: "Passed",
    status_failed: "Failed",
    status_unknown: "Unknown",
    status_not_applicable: "Not applicable",
    trust_not_applicable_flow: "Flow apps do not have their own container image. TAFFISH checks dependency metadata, and dependency tools keep their own container trust records.",
    trust_not_applicable_non_container: "This version has no container image, so the container smoke gate does not apply.",
    label_package_count: "Packages",
    install_chain: "Install Chain",
    latest_prefix: "latest",
    footer_tagline: "Static package registry for reproducible bioinformatics tools and flows.",
    footer_organization: "Organization",
    footer_center: "Center for Informational Biology",
    footer_university: "University of Electronic Science and Technology of China",
    footer_resources: "Resources",
    footer_github_org: "GitHub Organization",
    footer_docs: "Documentation",
    footer_preprint: "Preprint",
    quick_search: "Search",
    quick_packages: "Packages",
    quick_top: "Top",
    any: "any",
    none: "none"
  },
  zh: {
    nav_website: "官网",
    nav_github: "GitHub",
    nav_index_repo: "索引仓库",
    nav_trust_report: "可信报告",
    refresh: "刷新",
    title: "软件包索引",
    subtitle: "检索应用、查看版本，并基于确定性依赖完成安装。",
    metric_packages: "软件包",
    metric_versions: "版本数",
    metric_commands: "命令数",
    metric_repositories: "仓库数",
    metric_failed_gates: "失败 Gate",
    search: "搜索包名、命令名或仓库",
    kind_all: "全部",
    kind_tool: "工具",
    kind_flow: "流程",
    sort_name: "名称",
    sort_recent: "最新",
    filter_deps_only: "仅看有依赖",
    filter_container_only: "仅看有镜像",
    section_packages: "软件包",
    section_repositories: "仓库",
    section_warnings: "告警",
    empty_packages: "暂无软件包数据。",
    empty_repositories: "暂无仓库数据。",
    empty_warnings: "暂无告警。",
    empty_detail: "请选择一个软件包查看详情。",
    loading_packages_short: "加载中...",
    loading_packages: "正在加载 TAFFISH 索引数据...",
    loading_detail: "索引加载完成后会显示软件包详情。",
    install_commands: "安装命令",
    detail_versions: "版本",
    detail_dependencies: "依赖",
    detail_platform: "运行要求",
    detail_overview: "概览",
    detail_source: "来源",
    detail_runtime_container: "运行 / 容器",
    detail_validation: "验证",
    detail_upstream: "原始软件",
    group_identity: "身份信息",
    group_discovery: "发现信息",
    group_app_source: "App 仓库",
    group_release_source: "发布来源",
    group_runtime: "运行方式",
    group_container: "容器镜像",
    group_trust: "可信 Gate",
    group_smoke: "Smoke 测试",
    note: "说明",
    group_upstream_identity: "原始软件身份",
    group_upstream_links: "链接",
    group_upstream_reference: "引用",
    open_repo: "仓库",
    open_source: "源码",
    copy_latest: "复制最新安装命令",
    copy_version: "复制固定版本安装命令",
    copy_chain: "复制包含依赖的安装链",
    copy_done: "已复制。",
    copy_failed: "复制失败。",
    retry_sync: "重试",
    sync_syncing: "正在同步数据...",
    sync_done: "数据同步完成",
    sync_failed: "数据同步失败",
    sync_generated: "索引生成时间",
    sync_last_checked: "上次检查",
    sync_error_detail: "网络或权限问题",
    sync_alert_title: "索引同步失败",
    sync_alert_last_success: "上次成功同步",
    sync_alert_never: "尚无成功同步记录。",
    result_count: "条结果",
    table_package: "包名",
    table_latest: "最新",
    table_kind: "类型",
    table_command: "命令",
    table_dependencies: "依赖",
    table_repository: "仓库",
    table_dependency: "依赖命令",
    table_versions: "版本",
    table_tag: "标签",
    table_key: "字段",
    table_value: "值",
    platform_no_constraints: "未声明特殊操作系统、架构、容器、CPU 或内存约束。",
    platform_os: "操作系统",
    platform_arch: "CPU 架构",
    platform_container: "容器策略",
    platform_min_cpus: "最小 CPU 数",
    platform_min_memory: "最小内存",
    warning_message: "信息",
    warning_source: "来源",
    label_command: "命令",
    label_repository: "仓库",
    label_tag: "标签",
    label_license: "许可证",
    label_description: "说明",
    label_domain: "领域",
    label_categories: "分类",
    label_keywords: "关键词",
    label_source_ref: "源码引用",
    label_source_commit: "源码提交",
    label_upstream: "原始软件",
    label_upstream_type: "原始来源类型",
    label_upstream_url: "原始链接",
    label_upstream_homepage: "原始主页",
    label_upstream_repository: "原始仓库",
    label_upstream_release_url: "原始发布页",
    label_upstream_docker_image: "原始 Docker 镜像",
    label_upstream_version: "原始版本",
    label_upstream_license: "原始许可证",
    label_upstream_citation: "原始引用",
    label_upstream_doi: "原始 DOI",
    label_upstream_pmid: "原始 PMID",
    label_runtime: "运行模式",
    label_main: "入口脚本",
    label_help: "帮助文档",
    label_dockerfile: "Dockerfile",
    label_container_image: "容器镜像",
    label_container_tag: "镜像标签",
    label_container_digest: "镜像 Digest",
    label_container_platforms: "镜像平台",
    label_container_platform_digests: "平台 Digest",
    label_smoke_status: "Smoke 状态",
    label_smoke_backend: "Smoke 后端",
    label_smoke_timeout: "Smoke 超时",
    label_smoke_exist: "需存在的可执行程序",
    label_smoke_test: "Smoke 测试命令",
    label_smoke_checked_at: "Smoke 检查时间",
    label_trust_status: "可信状态",
    label_trust_policy: "可信策略",
    label_trust_source: "可信来源",
    label_trust_checked_at: "可信检查时间",
    status_passed: "已通过",
    status_failed: "失败",
    status_unknown: "未知",
    status_not_applicable: "不适用",
    trust_not_applicable_flow: "Flow app 没有独立容器镜像；TAFFISH 会检查依赖元数据，依赖工具保留各自的容器可信记录。",
    trust_not_applicable_non_container: "此版本没有容器镜像，因此不适用容器 smoke gate。",
    label_package_count: "软件包数",
    install_chain: "安装链",
    latest_prefix: "最新",
    footer_tagline: "面向可复现生信工具与流程的静态软件包索引。",
    footer_organization: "机构",
    footer_center: "信息生物学中心",
    footer_university: "电子科技大学",
    footer_resources: "资源",
    footer_github_org: "GitHub 组织",
    footer_docs: "文档",
    footer_preprint: "预印本",
    quick_search: "搜索",
    quick_packages: "列表",
    quick_top: "顶部",
    any: "任意",
    none: "无"
  }
};

const initialUrlState = readInitialUrlState();

const state = {
  locale: initialUrlState.locale || readStoredLocale(),
  syncState: "syncing",
  syncError: "",
  index: null,
  packages: [],
  packageMap: new Map(),
  repositories: [],
  warnings: [],
  lastSuccessSyncAt: localStorage.getItem(LAST_SUCCESS_SYNC_AT_KEY) || "",
  lastSuccessGeneratedAt: localStorage.getItem(LAST_SUCCESS_GENERATED_AT_KEY) || "",
  filters: {
    query: initialUrlState.query || "",
    kind: initialUrlState.kind || "all",
    sort: initialUrlState.sort || "name",
    depsOnly: initialUrlState.depsOnly || false,
    containerOnly: initialUrlState.containerOnly || false
  },
  selectedPackage: initialUrlState.selectedPackage || null,
  selectedVersion: initialUrlState.selectedVersion || null,
  copyToastTimer: null
};

function isInitialLoading() {
  return state.syncState === "syncing" && !state.index;
}

const el = {
  langEn: document.getElementById("langEn"),
  langZh: document.getElementById("langZh"),
  refreshData: document.getElementById("refreshData"),
  retryLoad: document.getElementById("retryLoad"),
  syncState: document.getElementById("syncState"),
  syncTime: document.getElementById("syncTime"),
  syncAlert: document.getElementById("syncAlert"),
  syncAlertTitle: document.getElementById("syncAlertTitle"),
  syncAlertDetail: document.getElementById("syncAlertDetail"),
  syncAlertLastSuccess: document.getElementById("syncAlertLastSuccess"),
  metricPackages: document.getElementById("metricPackages"),
  metricVersions: document.getElementById("metricVersions"),
  metricCommands: document.getElementById("metricCommands"),
  metricRepositories: document.getElementById("metricRepositories"),
  metricFailed: document.getElementById("metricFailed"),
  globalSearch: document.getElementById("globalSearch"),
  kindAll: document.getElementById("kindAll"),
  kindTool: document.getElementById("kindTool"),
  kindFlow: document.getElementById("kindFlow"),
  sortName: document.getElementById("sortName"),
  sortRecent: document.getElementById("sortRecent"),
  depsOnly: document.getElementById("depsOnly"),
  containerOnly: document.getElementById("containerOnly"),
  resultCount: document.getElementById("resultCount"),
  packagesEmpty: document.getElementById("packagesEmpty"),
  packagesTable: document.getElementById("packagesTable"),
  detailEmpty: document.getElementById("detailEmpty"),
  detailPane: document.getElementById("detailPane"),
  detailName: document.getElementById("detailName"),
  detailKind: document.getElementById("detailKind"),
  detailLatest: document.getElementById("detailLatest"),
  installLatest: document.getElementById("installLatest"),
  installVersion: document.getElementById("installVersion"),
  installChain: document.getElementById("installChain"),
  copyLatest: document.getElementById("copyLatest"),
  copyVersion: document.getElementById("copyVersion"),
  copyChain: document.getElementById("copyChain"),
  copyToast: document.getElementById("copyToast"),
  detailRepoLink: document.getElementById("detailRepoLink"),
  detailSourceLink: document.getElementById("detailSourceLink"),
  detailMeta: document.getElementById("detailMeta"),
  detailSurface: document.querySelector(".detail-surface"),
  versionsTable: document.getElementById("versionsTable"),
  dependenciesTable: document.getElementById("dependenciesTable"),
  dependenciesExpanded: document.getElementById("dependenciesExpanded"),
  platformTable: document.getElementById("platformTable"),
  warningsCount: document.getElementById("warningsCount"),
  warningsEmpty: document.getElementById("warningsEmpty"),
  warningsTable: document.getElementById("warningsTable"),
  reposEmpty: document.getElementById("reposEmpty"),
  reposGrid: document.getElementById("reposGrid"),
  searchSection: document.getElementById("searchSection"),
  packagesSection: document.getElementById("packagesSection"),
  quickSearch: document.getElementById("quickSearch"),
  quickPackages: document.getElementById("quickPackages"),
  quickTop: document.getElementById("quickTop")
};

function readStoredLocale() {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === "zh" ? "zh" : "en";
}

function readInitialUrlState() {
  const params = new URLSearchParams(window.location.search);
  const locale = params.get("lang");
  const kind = params.get("kind");
  const sort = params.get("sort");
  return {
    locale: locale === "zh" || locale === "en" ? locale : null,
    query: params.get("q") || "",
    kind: kind === "tool" || kind === "flow" || kind === "all" ? kind : null,
    sort: sort === "recent" || sort === "name" ? sort : null,
    depsOnly: params.get("deps") === "1",
    containerOnly: params.get("container") === "1",
    selectedPackage: params.get("pkg") || null,
    selectedVersion: params.get("ver") || null
  };
}

function writeUrlState() {
  const params = new URLSearchParams();
  if (state.locale === "zh") params.set("lang", "zh");
  if (state.filters.query.trim()) params.set("q", state.filters.query.trim());
  if (state.filters.kind !== "all") params.set("kind", state.filters.kind);
  if (state.filters.sort !== "name") params.set("sort", state.filters.sort);
  if (state.filters.depsOnly) params.set("deps", "1");
  if (state.filters.containerOnly) params.set("container", "1");
  if (state.selectedPackage) params.set("pkg", state.selectedPackage);
  if (state.selectedVersion) params.set("ver", state.selectedVersion);

  const query = params.toString();
  const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}

function t(key) {
  return (I18N[state.locale] && I18N[state.locale][key]) || I18N.en[key] || key;
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function parseVersionId(versionId) {
  const raw = String(versionId || "");
  const match = raw.match(/^(.*)-r(\d+)$/);
  if (!match) {
    return { core: raw, release: -1 };
  }
  return {
    core: match[1],
    release: Number(match[2])
  };
}

function compareToken(left, right) {
  const leftIsNumeric = /^\d+$/.test(left);
  const rightIsNumeric = /^\d+$/.test(right);
  if (leftIsNumeric && rightIsNumeric) {
    return Number(left) - Number(right);
  }
  return left.localeCompare(right);
}

function compareVersionCore(left, right) {
  const a = String(left || "").split(/[.\-_]/);
  const b = String(right || "").split(/[.\-_]/);
  const maxLength = Math.max(a.length, b.length);
  for (let i = 0; i < maxLength; i += 1) {
    if (i >= a.length) return -1;
    if (i >= b.length) return 1;
    const tokenCmp = compareToken(a[i], b[i]);
    if (tokenCmp !== 0) return tokenCmp;
  }
  return 0;
}

function compareVersionId(left, right) {
  const a = parseVersionId(left);
  const b = parseVersionId(right);
  const coreCmp = compareVersionCore(a.core, b.core);
  if (coreCmp !== 0) return coreCmp;
  if (a.release !== b.release) return a.release - b.release;
  return String(left).localeCompare(String(right));
}

function deriveRepositorySlug(value) {
  if (!isNonEmptyString(value)) return "";
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch (_) {
    return "";
  }
  return "";
}

function parseDependencies(rawDependencies) {
  const deps = asObject(rawDependencies);
  const rows = [];
  for (const name of Object.keys(deps).sort()) {
    const rawValue = deps[name];
    let versions = [];
    if (typeof rawValue === "string") {
      versions = rawValue.trim() ? [rawValue.trim()] : [];
    } else if (Array.isArray(rawValue)) {
      versions = rawValue
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (rawValue != null) {
      versions = [String(rawValue)];
    }
    rows.push({ name, versions });
  }
  return rows;
}

function isDefaultVersionAlias(versionId) {
  const value = String(versionId || "").trim().toLowerCase();
  return value === "" || value === "latest" || value === "*";
}

function buildInstallCommand(target, versionId = "") {
  return isDefaultVersionAlias(versionId)
    ? `taf install ${target}`
    : `taf install ${target} ${versionId}`;
}

function parseUpstream(rawUpstream) {
  const upstream = asObject(rawUpstream);
  const fields = [
    ["name", "name"],
    ["type", "type"],
    ["url", "url"],
    ["homepage", "homepage"],
    ["repository", "repository"],
    ["release_url", "releaseUrl"],
    ["docker_image", "dockerImage"],
    ["version", "version"],
    ["license", "license"],
    ["citation", "citation"],
    ["doi", "doi"],
    ["pmid", "pmid"]
  ];
  const result = {};
  for (const [rawKey, key] of fields) {
    const value = upstream[rawKey];
    if (isNonEmptyString(value)) {
      result[key] = key === "type" ? value.trim().toLowerCase() : value.trim();
    }
  }
  return Object.keys(result).length ? result : null;
}

function upstreamSearchText(upstream) {
  return upstream ? Object.values(upstream).join(" ").toLowerCase() : "";
}

function parsePlatform(rawPlatform) {
  const platform = asObject(rawPlatform);
  const minCpus = Number.isFinite(platform.min_cpus) ? platform.min_cpus : null;
  const minMemoryMb = Number.isFinite(platform.min_memory_mb) ? platform.min_memory_mb : null;
  return {
    os: normalizeStringList(platform.os),
    arch: normalizeStringList(platform.arch),
    container: isNonEmptyString(platform.container) ? platform.container : "optional",
    minCpus,
    minMemoryMb
  };
}

function parseMeta(rawMeta) {
  const meta = asObject(rawMeta);
  if (!Object.keys(meta).length) return null;
  const categories = normalizeStringList(meta.categories);
  if (!categories.length && isNonEmptyString(meta.category)) {
    categories.push(meta.category.trim());
  }
  const result = {
    domain: isNonEmptyString(meta.domain) ? meta.domain.trim() : "",
    categories,
    keywords: normalizeStringList(meta.keywords),
    description: isNonEmptyString(meta.description)
      ? meta.description.trim()
      : (isNonEmptyString(meta.summary) ? meta.summary.trim() : "")
  };
  return result.domain || result.categories.length || result.keywords.length || result.description
    ? result
    : null;
}

function metaSearchText(meta) {
  if (!meta) return "";
  return [
    meta.domain,
    meta.description,
    ...meta.categories,
    ...meta.keywords
  ].join(" ").toLowerCase();
}

function parseSmoke(rawSmoke) {
  const smoke = asObject(rawSmoke);
  if (!Object.keys(smoke).length) return null;
  return {
    backend: isNonEmptyString(smoke.backend) ? smoke.backend : "",
    timeout: Number.isFinite(smoke.timeout) ? smoke.timeout : null,
    exist: normalizeStringList(smoke.exist),
    test: normalizeStringList(smoke.test),
    status: isNonEmptyString(smoke.status) ? smoke.status : "",
    checkedAt: isNonEmptyString(smoke.checked_at) ? smoke.checked_at : "",
    backendUsed: isNonEmptyString(smoke.backend_used) ? smoke.backend_used : ""
  };
}

function parseTrust(rawTrust) {
  const trust = asObject(rawTrust);
  if (!Object.keys(trust).length) return null;
  return {
    status: isNonEmptyString(trust.status) ? trust.status : "",
    checkedAt: isNonEmptyString(trust.checked_at) ? trust.checked_at : "",
    policy: isNonEmptyString(trust.policy) ? trust.policy : "",
    source: isNonEmptyString(trust.source) ? trust.source : ""
  };
}

function parsePlatformDigests(rawPlatformDigests) {
  const platformDigests = asObject(rawPlatformDigests);
  return Object.keys(platformDigests)
    .sort()
    .filter((platform) => isNonEmptyString(platform) && isNonEmptyString(platformDigests[platform]))
    .map((platform) => ({
      platform,
      digest: String(platformDigests[platform]).trim()
    }));
}

function buildVersionRecord(versionId, rawRecord, packageEntry) {
  const record = asObject(rawRecord);
  const command = asObject(record.command);
  const runtime = asObject(record.runtime);
  const paths = asObject(record.paths);
  const source = asObject(record.source);
  const container = asObject(record.container);
  const dependencies = parseDependencies(record.dependencies);
  const upstream = parseUpstream(record.upstream);
  const meta = parseMeta(record.meta);

  const commandName = isNonEmptyString(command.name)
    ? command.name
    : (isNonEmptyString(asObject(packageEntry.command).name) ? asObject(packageEntry.command).name : "");

  const repositoryUrl = isNonEmptyString(record.repository_url)
    ? record.repository_url
    : (isNonEmptyString(packageEntry.repository_url) ? packageEntry.repository_url : "");
  const repositorySlug = isNonEmptyString(record.repository_slug)
    ? record.repository_slug
    : deriveRepositorySlug(repositoryUrl);
  const kind = isNonEmptyString(record.kind) ? record.kind : "tool";
  const containerImage = isNonEmptyString(container.image) ? container.image : "";
  const hasContainerImage = Boolean(containerImage);

  return {
    versionId,
    kind,
    tag: isNonEmptyString(record.tag) ? record.tag : "",
    release: Number.isFinite(record.release) ? record.release : null,
    license: isNonEmptyString(record.license) ? record.license : "",
    commandName,
    repositoryUrl,
    repositorySlug,
    dependencies,
    dependencyCount: dependencies.length,
    meta,
    metaSearchText: metaSearchText(meta),
    upstream,
    upstreamSearchText: upstreamSearchText(upstream),
    platform: parsePlatform(record.platform),
    paths: {
      main: isNonEmptyString(paths.main) ? paths.main : "",
      help: isNonEmptyString(paths.help) ? paths.help : "",
      dockerfile: isNonEmptyString(paths.dockerfile) ? paths.dockerfile : ""
    },
    runtime: {
      pipe: Boolean(runtime.pipe),
      commandMode: Boolean(runtime.command_mode)
    },
    container: {
      image: containerImage,
      dockerfile: isNonEmptyString(container.dockerfile) ? container.dockerfile : "",
      imageTag: isNonEmptyString(container.image_tag) ? container.image_tag : "",
      digest: isNonEmptyString(container.digest) ? container.digest : "",
      platforms: normalizeStringList(container.platforms),
      platformDigests: parsePlatformDigests(container.platform_digests)
    },
    smoke: parseSmoke(record.smoke),
    trust: parseTrust(record.trust),
    hasContainerImage,
    source: {
      ref: isNonEmptyString(source.ref) ? source.ref : "",
      commit: isNonEmptyString(source.commit) ? source.commit : "",
      htmlUrl: isNonEmptyString(source.html_url) ? source.html_url : ""
    }
  };
}

function buildPackageRecord(packageName, rawEntry) {
  const entry = asObject(rawEntry);
  const versionsObject = asObject(entry.versions);
  const versions = Object.keys(versionsObject).map((versionId) =>
    buildVersionRecord(versionId, versionsObject[versionId], entry)
  );
  versions.sort((a, b) => compareVersionId(b.versionId, a.versionId));

  let latest = isNonEmptyString(entry.latest) ? entry.latest : "";
  if (!latest && versions.length > 0) {
    latest = versions[0].versionId;
  }
  let latestRecord = versions.find((item) => item.versionId === latest) || null;
  if (!latestRecord && versions.length > 0) {
    latestRecord = versions[0];
    latest = latestRecord.versionId;
  }

  const repositoryUrl = isNonEmptyString(entry.repository_url)
    ? entry.repository_url
    : (latestRecord ? latestRecord.repositoryUrl : "");
  const repositorySlug = latestRecord && isNonEmptyString(latestRecord.repositorySlug)
    ? latestRecord.repositorySlug
    : deriveRepositorySlug(repositoryUrl);
  const commandName = latestRecord && isNonEmptyString(latestRecord.commandName)
    ? latestRecord.commandName
    : (isNonEmptyString(asObject(entry.command).name) ? asObject(entry.command).name : "");
  const kind = latestRecord ? latestRecord.kind : "tool";
  const dependencyCount = latestRecord ? latestRecord.dependencyCount : 0;
  const hasContainerImage = latestRecord ? latestRecord.hasContainerImage : false;

  const searchText = [
    packageName,
    latest,
    commandName,
    repositorySlug,
    repositoryUrl,
    ...versions.map((item) => item.versionId),
    ...versions.map((item) => item.metaSearchText),
    ...versions.map((item) => item.upstreamSearchText)
  ].join(" ").toLowerCase();

  return {
    name: packageName,
    latest,
    kind,
    commandName,
    repositoryUrl,
    repositorySlug,
    dependencyCount,
    hasContainerImage,
    versions,
    latestRecord,
    searchText
  };
}

function buildRepositoryRows(rawIndex) {
  const repositoriesObject = asObject(rawIndex.repositories);
  const rows = [];
  for (const key of Object.keys(repositoriesObject).sort()) {
    const row = asObject(repositoriesObject[key]);
    const slug = isNonEmptyString(row.repository) ? row.repository : key;
    const packages = normalizeStringList(row.packages);
    rows.push({
      slug,
      url: `https://github.com/${slug}`,
      packages,
      packageCount: packages.length,
      searchText: `${slug} ${packages.join(" ")}`.toLowerCase()
    });
  }
  return rows;
}

function buildWarningRows(rawIndex) {
  const warnings = Array.isArray(rawIndex.warnings) ? rawIndex.warnings : [];
  return warnings.map((item) => {
    const warning = asObject(item);
    return {
      repository: isNonEmptyString(warning.repository) ? warning.repository : "-",
      ref: isNonEmptyString(warning.ref) ? warning.ref : "",
      message: isNonEmptyString(warning.message) ? warning.message : "-"
    };
  });
}

function normalizeIndex(rawIndex) {
  const index = asObject(rawIndex);
  const packagesObject = asObject(index.packages);
  const packageNames = Object.keys(packagesObject).sort();
  const packages = packageNames.map((name) => buildPackageRecord(name, packagesObject[name]));
  const packageMap = new Map(packages.map((pkg) => [pkg.name, pkg]));
  const repositories = buildRepositoryRows(index);
  const warnings = buildWarningRows(index);
  return {
    generatedAt: isNonEmptyString(index.generated_at) ? index.generated_at : "",
    counts: asObject(index.counts),
    packages,
    packageMap,
    repositories,
    warnings
  };
}

function getFilteredPackages() {
  const { query, kind, depsOnly, containerOnly, sort } = state.filters;
  const keyword = query.trim().toLowerCase();
  const rows = state.packages.filter((pkg) => {
    if (kind !== "all" && pkg.kind !== kind) return false;
    if (depsOnly && pkg.dependencyCount <= 0) return false;
    if (containerOnly && !pkg.hasContainerImage) return false;
    if (!keyword) return true;
    return pkg.searchText.includes(keyword);
  });

  rows.sort((a, b) => {
    if (sort === "recent") {
      const byLatest = compareVersionId(b.latest || "", a.latest || "");
      if (byLatest !== 0) return byLatest;
    }
    return a.name.localeCompare(b.name);
  });

  return rows;
}

function getFilteredRepositories() {
  const keyword = state.filters.query.trim().toLowerCase();
  if (!keyword) return state.repositories;
  return state.repositories.filter((repo) => repo.searchText.includes(keyword));
}

function formatLocalDateTime(input) {
  if (!input) return "-";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "-";
  const localeTag = state.locale === "zh" ? "zh-CN" : "en-US";
  return new Intl.DateTimeFormat(localeTag, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(date);
}

function formatCount(value) {
  if (!Number.isFinite(value)) return "-";
  const localeTag = state.locale === "zh" ? "zh-CN" : "en-US";
  return new Intl.NumberFormat(localeTag).format(value);
}

function createCell(text, className = "") {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  return div;
}

function createPackageCell(text, className, label) {
  const cell = createCell(text, className);
  cell.dataset.label = label;
  return cell;
}

function createHeaderRow(labels, extraClass = "") {
  const row = document.createElement("div");
  row.className = `table-row header ${extraClass}`.trim();
  for (const label of labels) {
    row.append(createCell(label));
  }
  return row;
}

function createLoadingRows() {
  const fragment = document.createDocumentFragment();
  for (let rowIndex = 0; rowIndex < 4; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "table-row loading-row";
    for (let columnIndex = 0; columnIndex < 6; columnIndex += 1) {
      const cell = document.createElement("div");
      const bar = document.createElement("span");
      bar.className = "skeleton-line";
      bar.style.width = `${84 - ((rowIndex + columnIndex) % 3) * 16}%`;
      cell.append(bar);
      row.append(cell);
    }
    fragment.append(row);
  }
  return fragment;
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 700px)").matches;
}

function createMiniRow(values, classNames = [], extraClass = "") {
  const row = document.createElement("div");
  row.className = `mini-row ${extraClass}`.trim();
  values.forEach((value, index) => {
    row.append(createCell(value, classNames[index] || ""));
  });
  return row;
}

function formatRuntime(runtime) {
  const mode = runtime.commandMode ? "command" : "script";
  return `pipe=${runtime.pipe ? "true" : "false"}, mode=${mode}`;
}

function ensureSelection(filteredPackages) {
  if (filteredPackages.length === 0) {
    state.selectedPackage = null;
    state.selectedVersion = null;
    return;
  }

  const selectedPackageExists = filteredPackages.some((pkg) => pkg.name === state.selectedPackage);
  if (!selectedPackageExists) {
    state.selectedPackage = filteredPackages[0].name;
    state.selectedVersion = filteredPackages[0].latest;
    return;
  }

  const pkg = state.packageMap.get(state.selectedPackage);
  if (!pkg) {
    state.selectedPackage = filteredPackages[0].name;
    state.selectedVersion = filteredPackages[0].latest;
    return;
  }

  const versionExists = pkg.versions.some((item) => item.versionId === state.selectedVersion);
  if (!versionExists) {
    state.selectedVersion = pkg.latest;
  }
}

function renderSync() {
  const syncKey = state.syncState === "failed"
    ? "sync_failed"
    : (state.syncState === "done" ? "sync_done" : "sync_syncing");
  el.syncState.textContent = t(syncKey);

  const generated = (state.index && state.index.generatedAt)
    ? state.index.generatedAt
    : state.lastSuccessGeneratedAt;
  const parts = [`${t("sync_generated")}: ${formatLocalDateTime(generated)}`];
  if (state.lastSuccessSyncAt) {
    parts.push(`${t("sync_last_checked")}: ${formatLocalDateTime(state.lastSuccessSyncAt)}`);
  }
  el.syncTime.textContent = parts.join(" | ");

  if (state.syncState !== "failed") {
    el.syncAlert.classList.add("hidden");
    return;
  }

  el.syncAlertTitle.textContent = t("sync_alert_title");
  el.syncAlertDetail.textContent = state.syncError
    ? state.syncError
    : t("sync_error_detail");
  el.syncAlertLastSuccess.textContent = state.lastSuccessSyncAt
    ? `${t("sync_alert_last_success")}: ${formatLocalDateTime(state.lastSuccessSyncAt)}`
    : `${t("sync_alert_last_success")}: ${t("sync_alert_never")}`;
  el.syncAlert.classList.remove("hidden");
}

function renderMetrics() {
  if (isInitialLoading()) {
    el.metricPackages.textContent = "-";
    el.metricVersions.textContent = "-";
    el.metricCommands.textContent = "-";
    el.metricRepositories.textContent = "-";
    el.metricFailed.textContent = "-";
    return;
  }

  const counts = state.index ? state.index.counts : {};
  const packageCount = state.packages.length || Number(counts.packages) || 0;
  const versionCount = Number(counts.versions) || state.packages.reduce((sum, pkg) => sum + pkg.versions.length, 0);
  const commandCount = Number(counts.commands) || state.packages.filter((pkg) => isNonEmptyString(pkg.commandName)).length;
  const repoCount = state.repositories.length || Number(counts.repositories) || 0;
  const failedCount = Number(counts.failed) || 0;

  el.metricPackages.textContent = formatCount(packageCount);
  el.metricVersions.textContent = formatCount(versionCount);
  el.metricCommands.textContent = formatCount(commandCount);
  el.metricRepositories.textContent = formatCount(repoCount);
  el.metricFailed.textContent = formatCount(failedCount);
}

function renderPackages() {
  if (isInitialLoading()) {
    el.resultCount.textContent = t("loading_packages_short");
    el.packagesEmpty.textContent = t("loading_packages");
    el.packagesEmpty.classList.add("loading-empty");
    el.packagesEmpty.classList.remove("hidden");
    el.packagesTable.textContent = "";
    el.packagesTable.append(createLoadingRows());
    return;
  }

  el.packagesEmpty.classList.remove("loading-empty");
  el.packagesEmpty.textContent = t("empty_packages");

  const filtered = getFilteredPackages();
  ensureSelection(filtered);

  el.resultCount.textContent = `${formatCount(filtered.length)} ${t("result_count")}`;
  el.packagesTable.textContent = "";

  if (filtered.length === 0) {
    el.packagesEmpty.classList.remove("hidden");
    writeUrlState();
    return;
  }

  el.packagesEmpty.classList.add("hidden");
  el.packagesTable.append(
    createHeaderRow([
      t("table_package"),
      t("table_latest"),
      t("table_kind"),
      t("table_command"),
      t("table_dependencies"),
      t("table_repository")
    ])
  );

  for (const pkg of filtered) {
    const row = document.createElement("div");
    row.className = "table-row item";
    row.setAttribute("role", "button");
    row.tabIndex = 0;
    if (pkg.name === state.selectedPackage) {
      row.classList.add("active");
    }

    const repositoryLabel = isNonEmptyString(pkg.repositorySlug)
      ? pkg.repositorySlug
      : (isNonEmptyString(pkg.repositoryUrl) ? pkg.repositoryUrl : "-");
    const kindLabel = pkg.kind === "flow" ? t("kind_flow") : t("kind_tool");

    row.append(
      createPackageCell(pkg.name, "cell-package", t("table_package")),
      createPackageCell(pkg.latest || "-", "cell-latest cell-mono", t("table_latest")),
      createPackageCell(kindLabel, "cell-kind", t("table_kind")),
      createPackageCell(pkg.commandName || "-", "cell-command cell-mono", t("table_command")),
      createPackageCell(String(pkg.dependencyCount), "cell-deps cell-center", t("table_dependencies")),
      createPackageCell(repositoryLabel, "cell-repo cell-mono", t("table_repository"))
    );

    const choose = () => {
      state.selectedPackage = pkg.name;
      state.selectedVersion = pkg.latest;
      renderPackages();
      renderDetail();
      writeUrlState();
      if (isMobileViewport()) {
        window.setTimeout(() => scrollToNode(el.detailSurface), 80);
      }
    };

    row.addEventListener("click", choose);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        choose();
      }
    });

    el.packagesTable.append(row);
  }

  writeUrlState();
}

function createDetailSection(title, modifier = "") {
  const section = document.createElement("section");
  section.className = `detail-card ${modifier}`.trim();

  const head = document.createElement("div");
  head.className = "detail-card-head";
  const label = document.createElement("p");
  label.className = "subhead";
  label.textContent = title;
  head.append(label);

  const body = document.createElement("div");
  body.className = "detail-card-body";

  section.append(head, body);
  el.detailMeta.append(section);
  return body;
}

function appendDetailSummary(text, target) {
  if (!isNonEmptyString(text)) return;
  const summary = document.createElement("p");
  summary.className = "detail-summary";
  summary.textContent = text.trim();
  target.append(summary);
}

function createDetailGroup(title, target, modifier = "") {
  const group = document.createElement("div");
  group.className = `detail-group ${modifier}`.trim();

  if (isNonEmptyString(title)) {
    const label = document.createElement("p");
    label.className = "detail-group-title";
    label.textContent = title;
    group.append(label);
  }

  const grid = document.createElement("div");
  grid.className = "kv-grid";
  group.append(grid);
  target.append(group);
  return grid;
}

function appendKv(key, value, target = el.detailMeta) {
  target.append(createCell(key, "kv-key"));
  if (value instanceof Node) {
    const valueWrapper = document.createElement("div");
    valueWrapper.className = "kv-value";
    valueWrapper.append(value);
    target.append(valueWrapper);
    return;
  }
  target.append(createCell(value || "-", "kv-value"));
}

function appendOptionalKv(key, value, target = el.detailMeta) {
  if (value instanceof Node || isNonEmptyString(value)) {
    appendKv(key, value, target);
  }
}

function buildLinkNode(text, url) {
  const link = document.createElement("a");
  link.className = "cell-link";
  link.href = url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = text;
  return link;
}

function buildCodeListNode(values) {
  const list = document.createElement("div");
  list.className = "kv-code-list";
  for (const value of values) {
    if (!isNonEmptyString(value)) continue;
    const item = document.createElement("code");
    item.textContent = value.trim();
    list.append(item);
  }
  return list.childElementCount ? list : null;
}

function buildExecutableListNode(values) {
  const list = document.createElement("div");
  list.className = "kv-executable-list";
  for (const value of values) {
    if (!isNonEmptyString(value)) continue;
    const item = document.createElement("span");
    item.className = "kv-executable cell-mono";
    item.textContent = value.trim();
    list.append(item);
  }
  return list.childElementCount ? list : null;
}

function buildChipListNode(values, options = {}) {
  const normalized = typeof options === "boolean" ? { mono: options } : options;
  const variant = normalized.variant || "";
  const prefix = normalized.prefix || "";
  const list = document.createElement("div");
  list.className = `kv-chip-list ${variant}`.trim();
  for (const value of values) {
    if (!isNonEmptyString(value)) continue;
    const item = document.createElement("span");
    item.className = `kv-chip ${variant} ${normalized.mono ? "cell-mono" : ""}`.trim();
    item.textContent = `${prefix}${value.trim()}`;
    list.append(item);
  }
  return list.childElementCount ? list : null;
}

function localizedStatusLabel(value) {
  const status = isNonEmptyString(value) ? value.trim() : "";
  const normalized = status.toLowerCase();
  if (["passed", "trusted", "ok", "valid"].includes(normalized)) {
    return t("status_passed");
  }
  if (["failed", "error", "blocked", "invalid"].includes(normalized)) {
    return t("status_failed");
  }
  if (normalized === "not_applicable") {
    return t("status_not_applicable");
  }
  if (!status || normalized === "unknown") {
    return t("status_unknown");
  }
  return status;
}

function trustNotApplicableNote(version) {
  const status = version && version.trust && version.trust.status;
  if (!isNonEmptyString(status) || status.trim().toLowerCase() !== "not_applicable") {
    return "";
  }
  return version.kind === "flow"
    ? t("trust_not_applicable_flow")
    : t("trust_not_applicable_non_container");
}

function buildStatusPill(value) {
  const status = isNonEmptyString(value) ? value.trim() : "-";
  const normalized = status.toLowerCase();
  const pill = document.createElement("span");
  pill.className = "status-pill";
  if (["passed", "trusted", "ok", "valid"].includes(normalized)) {
    pill.classList.add("passed");
  } else if (["failed", "error", "blocked", "invalid"].includes(normalized)) {
    pill.classList.add("failed");
  } else {
    pill.classList.add("neutral");
  }
  pill.textContent = localizedStatusLabel(status);
  return pill;
}

function buildPlatformDigestNode(platformDigests) {
  const values = platformDigests.map((item) => `${item.platform}: ${item.digest}`);
  return buildCodeListNode(values);
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(String(value || ""));
}

function upstreamRepositoryUrl(upstream) {
  const repository = upstream && upstream.repository;
  if (!isNonEmptyString(repository)) return "";
  if (isHttpUrl(repository)) return repository;
  if (upstream.type === "github" && repository.includes("/")) {
    return `https://github.com/${repository}`;
  }
  if (upstream.type === "gitlab" && repository.includes("/")) {
    return `https://gitlab.com/${repository}`;
  }
  return "";
}

function appendOptionalLinkKv(key, text, url, target = el.detailMeta) {
  if (!isNonEmptyString(text)) return;
  if (isNonEmptyString(url)) {
    appendKv(key, buildLinkNode(text, url), target);
    return;
  }
  appendKv(key, text, target);
}

function renderVersionsTable(pkg) {
  el.versionsTable.textContent = "";
  const header = document.createElement("div");
  header.className = "mini-row header three";
  header.append(
    createCell(t("table_latest")),
    createCell(t("table_kind")),
    createCell(t("table_tag"))
  );
  el.versionsTable.append(header);

  for (const version of pkg.versions) {
    const row = createMiniRow(
      [
        version.versionId || "-",
        version.kind === "flow" ? t("kind_flow") : t("kind_tool"),
        version.tag || "-"
      ],
      ["cell-mono", "", "cell-mono"],
      "three item"
    );
    if (version.versionId === state.selectedVersion) {
      row.classList.add("active");
    }
    row.addEventListener("click", () => {
      state.selectedVersion = version.versionId;
      renderDetail();
      writeUrlState();
    });
    el.versionsTable.append(row);
  }
}

function buildInstallChain(pkg, version) {
  const lines = [];
  for (const dependency of version.dependencies) {
    if (!dependency.versions.length) {
      lines.push(buildInstallCommand(dependency.name));
      continue;
    }
    for (const versionId of dependency.versions) {
      lines.push(buildInstallCommand(dependency.name, versionId));
    }
  }
  lines.push(buildInstallCommand(pkg.name, version.versionId));
  return lines;
}

function renderDependenciesTable(version) {
  el.dependenciesTable.textContent = "";
  const header = document.createElement("div");
  header.className = "mini-row header";
  header.append(createCell(t("table_dependency")), createCell(t("table_versions")));
  el.dependenciesTable.append(header);

  if (!version.dependencies.length) {
    el.dependenciesTable.append(createMiniRow(["-", t("none")]));
    return;
  }

  for (const dependency of version.dependencies) {
    const versionText = dependency.versions.length ? dependency.versions.join(", ") : t("none");
    el.dependenciesTable.append(
      createMiniRow([dependency.name, versionText], ["cell-mono", "cell-mono"])
    );
  }
}

function renderDependenciesExpanded(version) {
  el.dependenciesExpanded.textContent = "";
  if (!version.dependencies.length) {
    const none = document.createElement("div");
    none.className = "dep-item";
    none.textContent = t("none");
    el.dependenciesExpanded.append(none);
    return;
  }

  for (const dependency of version.dependencies) {
    const item = document.createElement("div");
    item.className = "dep-item";

    const name = document.createElement("p");
    name.className = "dep-name cell-mono";
    name.textContent = dependency.name;

    const versions = document.createElement("div");
    versions.className = "dep-versions";

    const normalizedVersions = dependency.versions.length
      ? dependency.versions
      : [t("none")];
    for (const versionId of normalizedVersions) {
      const tag = document.createElement("span");
      tag.className = "dep-version cell-mono";
      tag.textContent = versionId;
      versions.append(tag);
    }

    item.append(name, versions);
    el.dependenciesExpanded.append(item);
  }
}

function renderPlatformTable(version) {
  el.platformTable.textContent = "";
  const platform = version.platform;
  const hasOs = platform.os.length > 0;
  const hasArch = platform.arch.length > 0;
  const hasContainerPolicy = isNonEmptyString(platform.container) && platform.container !== "optional";
  const hasMinCpus = platform.minCpus != null;
  const hasMinMemory = platform.minMemoryMb != null;

  if (!hasOs && !hasArch && !hasContainerPolicy && !hasMinCpus && !hasMinMemory) {
    const note = document.createElement("div");
    note.className = "runtime-note";
    note.textContent = t("platform_no_constraints");
    el.platformTable.append(note);
    return;
  }

  const header = document.createElement("div");
  header.className = "mini-row header";
  header.append(createCell(t("table_key")), createCell(t("table_value")));
  el.platformTable.append(header);

  if (hasOs) {
    el.platformTable.append(createMiniRow([t("platform_os"), platform.os.join(", ")], ["", "cell-mono"]));
  }
  if (hasArch) {
    el.platformTable.append(createMiniRow([t("platform_arch"), platform.arch.join(", ")], ["", "cell-mono"]));
  }
  if (hasContainerPolicy) {
    el.platformTable.append(createMiniRow([t("platform_container"), platform.container], ["", "cell-mono"]));
  }
  if (hasMinCpus) {
    el.platformTable.append(createMiniRow([t("platform_min_cpus"), String(platform.minCpus)], ["", "cell-mono"]));
  }
  if (hasMinMemory) {
    el.platformTable.append(
      createMiniRow([t("platform_min_memory"), `${platform.minMemoryMb} MB`], ["", "cell-mono"])
    );
  }
}

function renderDetailActionLinks(version) {
  if (isNonEmptyString(version.repositoryUrl)) {
    el.detailRepoLink.href = version.repositoryUrl;
    el.detailRepoLink.classList.remove("hidden");
  } else {
    el.detailRepoLink.href = "#";
    el.detailRepoLink.classList.add("hidden");
  }

  if (isNonEmptyString(version.source.htmlUrl)) {
    el.detailSourceLink.href = version.source.htmlUrl;
    el.detailSourceLink.classList.remove("hidden");
  } else {
    el.detailSourceLink.href = "#";
    el.detailSourceLink.classList.add("hidden");
  }
}

function renderUpstreamMeta(upstream, target) {
  if (!upstream) return;

  if (upstream.name || upstream.type || upstream.version || upstream.license) {
    const identity = createDetailGroup(t("group_upstream_identity"), target);
    appendOptionalKv(t("label_upstream"), upstream.name, identity);
    appendOptionalKv(t("label_upstream_type"), upstream.type, identity);
    appendOptionalKv(t("label_upstream_version"), upstream.version, identity);
    appendOptionalKv(t("label_upstream_license"), upstream.license, identity);
  }

  if (upstream.url || upstream.homepage || upstream.repository || upstream.releaseUrl || upstream.dockerImage) {
    const links = createDetailGroup(t("group_upstream_links"), target);
    appendOptionalLinkKv(
      t("label_upstream_url"),
      upstream.url,
      isHttpUrl(upstream.url) ? upstream.url : "",
      links
    );
    appendOptionalLinkKv(
      t("label_upstream_homepage"),
      upstream.homepage,
      isHttpUrl(upstream.homepage) ? upstream.homepage : "",
      links
    );
    appendOptionalLinkKv(
      t("label_upstream_repository"),
      upstream.repository,
      upstreamRepositoryUrl(upstream),
      links
    );
    appendOptionalLinkKv(
      t("label_upstream_release_url"),
      upstream.releaseUrl,
      isHttpUrl(upstream.releaseUrl) ? upstream.releaseUrl : "",
      links
    );
    appendOptionalKv(t("label_upstream_docker_image"), upstream.dockerImage, links);
  }

  if (upstream.citation || upstream.doi || upstream.pmid) {
    const reference = createDetailGroup(t("group_upstream_reference"), target);
    appendOptionalKv(t("label_upstream_citation"), upstream.citation, reference);
    appendOptionalLinkKv(
      t("label_upstream_doi"),
      upstream.doi,
      isNonEmptyString(upstream.doi) ? `https://doi.org/${upstream.doi}` : "",
      reference
    );
    appendOptionalLinkKv(
      t("label_upstream_pmid"),
      upstream.pmid,
      isNonEmptyString(upstream.pmid)
        ? `https://pubmed.ncbi.nlm.nih.gov/${upstream.pmid}/`
        : "",
      reference
    );
  }
}

function renderDetail() {
  if (isInitialLoading()) {
    el.detailEmpty.textContent = t("loading_detail");
    el.detailEmpty.classList.add("loading-empty");
    el.detailEmpty.classList.remove("hidden");
    el.detailPane.classList.add("hidden");
    return;
  }

  el.detailEmpty.textContent = t("empty_detail");
  el.detailEmpty.classList.remove("loading-empty");

  const pkg = state.packageMap.get(state.selectedPackage || "");
  if (!pkg) {
    el.detailEmpty.classList.remove("hidden");
    el.detailPane.classList.add("hidden");
    writeUrlState();
    return;
  }

  let version = pkg.versions.find((item) => item.versionId === state.selectedVersion);
  if (!version) {
    version = pkg.latestRecord || pkg.versions[0] || null;
    state.selectedVersion = version ? version.versionId : null;
  }
  if (!version) {
    el.detailEmpty.classList.remove("hidden");
    el.detailPane.classList.add("hidden");
    writeUrlState();
    return;
  }

  el.detailEmpty.classList.add("hidden");
  el.detailPane.classList.remove("hidden");
  el.detailName.textContent = pkg.name;
  el.detailKind.textContent = version.kind === "flow" ? t("kind_flow") : t("kind_tool");
  el.detailLatest.textContent = `${t("latest_prefix")}: ${pkg.latest || "-"}`;

  el.installLatest.textContent = buildInstallCommand(pkg.name);
  el.installVersion.textContent = buildInstallCommand(pkg.name, version.versionId);
  el.installChain.textContent = buildInstallChain(pkg, version).join("\n");
  renderDetailActionLinks(version);

  el.detailMeta.textContent = "";
  const overview = createDetailSection(t("detail_overview"), "overview");
  appendDetailSummary(version.meta && version.meta.description, overview);

  const identity = createDetailGroup(t("group_identity"), overview);
  appendKv(t("label_command"), version.commandName || "-", identity);
  appendKv(t("label_tag"), version.tag || "-", identity);
  appendKv(t("label_license"), version.license || "-", identity);

  if (version.meta && (version.meta.domain || version.meta.categories.length || version.meta.keywords.length)) {
    const discovery = createDetailGroup(t("group_discovery"), overview);
    appendOptionalKv(t("label_domain"), version.meta.domain, discovery);
    if (version.meta.categories.length) {
      appendKv(t("label_categories"), buildChipListNode(version.meta.categories, { variant: "category" }), discovery);
    }
    if (version.meta.keywords.length) {
      appendKv(t("label_keywords"), buildChipListNode(version.meta.keywords, { variant: "keyword", prefix: "#" }), discovery);
    }
  }

  const source = createDetailSection(t("detail_source"));
  const appSource = createDetailGroup(t("group_app_source"), source);
  if (isNonEmptyString(version.repositoryUrl)) {
    appendKv(
      t("label_repository"),
      buildLinkNode(version.repositorySlug || version.repositoryUrl, version.repositoryUrl),
      appSource
    );
  } else {
    appendKv(t("label_repository"), "-", appSource);
  }
  const releaseSource = createDetailGroup(t("group_release_source"), source);
  appendKv(t("label_source_ref"), version.source.ref || "-", releaseSource);
  appendKv(t("label_source_commit"), version.source.commit || "-", releaseSource);

  const runtimeContainer = createDetailSection(t("detail_runtime_container"));
  const runtimeGroup = createDetailGroup(t("group_runtime"), runtimeContainer);
  appendKv(t("label_runtime"), formatRuntime(version.runtime), runtimeGroup);
  appendKv(t("label_main"), version.paths.main || "-", runtimeGroup);
  appendKv(t("label_help"), version.paths.help || "-", runtimeGroup);

  if (version.paths.dockerfile || version.container.image || version.container.imageTag || version.container.digest || version.container.platforms.length) {
    const containerGroup = createDetailGroup(t("group_container"), runtimeContainer);
    appendKv(t("label_dockerfile"), version.paths.dockerfile || "-", containerGroup);
    appendKv(t("label_container_image"), version.container.image || "-", containerGroup);
    appendKv(t("label_container_tag"), version.container.imageTag || "-", containerGroup);
    appendOptionalKv(t("label_container_digest"), version.container.digest, containerGroup);
    appendOptionalKv(
      t("label_container_platforms"),
      version.container.platforms.length
        ? buildChipListNode(version.container.platforms, true)
        : "",
      containerGroup
    );
    if (version.container.platformDigests.length) {
      appendKv(
        t("label_container_platform_digests"),
        buildPlatformDigestNode(version.container.platformDigests),
        containerGroup
      );
    }
  }

  if (version.smoke || version.trust) {
    const validation = createDetailSection(t("detail_validation"), "validation");
    if (version.trust) {
      const trust = createDetailGroup(t("group_trust"), validation);
      appendKv(t("label_trust_status"), buildStatusPill(version.trust.status), trust);
      appendOptionalKv(t("note"), trustNotApplicableNote(version), trust);
      appendOptionalKv(t("label_trust_policy"), version.trust.policy, trust);
      appendOptionalKv(t("label_trust_source"), version.trust.source, trust);
      appendOptionalKv(t("label_trust_checked_at"), version.trust.checkedAt, trust);
    }
    if (version.smoke) {
      const smoke = createDetailGroup(t("group_smoke"), validation);
      appendKv(t("label_smoke_status"), buildStatusPill(version.smoke.status), smoke);
      appendKv(
        t("label_smoke_backend"),
        version.smoke.backendUsed || version.smoke.backend || "-",
        smoke
      );
      appendOptionalKv(
        t("label_smoke_timeout"),
        version.smoke.timeout == null ? "" : `${version.smoke.timeout}s`,
        smoke
      );
      if (version.smoke.exist.length) {
        appendKv(t("label_smoke_exist"), buildExecutableListNode(version.smoke.exist), smoke);
      }
      if (version.smoke.test.length) {
        appendKv(t("label_smoke_test"), buildCodeListNode(version.smoke.test), smoke);
      }
      appendOptionalKv(t("label_smoke_checked_at"), version.smoke.checkedAt, smoke);
    }
  }

  if (version.upstream) {
    renderUpstreamMeta(version.upstream, createDetailSection(t("detail_upstream")));
  }

  renderVersionsTable(pkg);
  renderDependenciesTable(version);
  renderDependenciesExpanded(version);
  renderPlatformTable(version);
  writeUrlState();
}

function renderWarnings() {
  el.warningsTable.textContent = "";
  el.warningsCount.textContent = formatCount(state.warnings.length);

  if (!state.warnings.length) {
    el.warningsEmpty.classList.remove("hidden");
    return;
  }

  el.warningsEmpty.classList.add("hidden");
  const header = document.createElement("div");
  header.className = "mini-row header";
  header.append(createCell(t("warning_message")), createCell(t("warning_source")));
  el.warningsTable.append(header);

  for (const warning of state.warnings) {
    const sourceText = warning.ref
      ? `${warning.repository} @ ${warning.ref}`
      : warning.repository;
    const row = createMiniRow(
      [warning.message, sourceText],
      ["warning-title", "warning-meta"]
    );
    el.warningsTable.append(row);
  }
}

function renderRepositories() {
  const repositories = getFilteredRepositories();
  el.reposGrid.textContent = "";

  if (repositories.length === 0) {
    el.reposEmpty.classList.remove("hidden");
    return;
  }

  el.reposEmpty.classList.add("hidden");
  for (const repo of repositories) {
    const link = document.createElement("a");
    link.className = "repo-card";
    link.href = repo.url;
    link.target = "_blank";
    link.rel = "noreferrer";

    const thumb = document.createElement("div");
    thumb.className = "repo-thumb repo-thumb-text";
    thumb.textContent = repo.slug;

    const body = document.createElement("div");
    body.className = "repo-body";

    const title = document.createElement("p");
    title.className = "repo-title";
    title.textContent = repo.slug;

    const count = document.createElement("p");
    count.className = "repo-meta";
    count.textContent = `${t("label_package_count")}: ${repo.packageCount}`;

    const list = document.createElement("p");
    list.className = "repo-meta";
    list.textContent = repo.packages.length ? repo.packages.join(", ") : t("none");

    body.append(title, count, list);
    link.append(thumb, body);
    el.reposGrid.append(link);
  }
}

function applyI18n() {
  document.documentElement.lang = state.locale === "zh" ? "zh-CN" : "en";

  for (const node of document.querySelectorAll("[data-i18n]")) {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key);
  }
  for (const node of document.querySelectorAll("[data-i18n-placeholder]")) {
    const key = node.getAttribute("data-i18n-placeholder");
    node.setAttribute("placeholder", t(key));
  }
  for (const node of document.querySelectorAll("[data-i18n-title]")) {
    const key = node.getAttribute("data-i18n-title");
    node.setAttribute("title", t(key));
  }

  el.kindTool.textContent = t("kind_tool");
  el.kindFlow.textContent = t("kind_flow");
  el.sortName.textContent = t("sort_name");
  el.sortRecent.textContent = t("sort_recent");

  el.langEn.classList.toggle("active", state.locale === "en");
  el.langZh.classList.toggle("active", state.locale === "zh");
  el.langEn.setAttribute("aria-pressed", state.locale === "en" ? "true" : "false");
  el.langZh.setAttribute("aria-pressed", state.locale === "zh" ? "true" : "false");
}

function renderKindState() {
  el.kindAll.classList.toggle("active", state.filters.kind === "all");
  el.kindTool.classList.toggle("active", state.filters.kind === "tool");
  el.kindFlow.classList.toggle("active", state.filters.kind === "flow");
}

function renderSortState() {
  el.sortName.classList.toggle("active", state.filters.sort === "name");
  el.sortRecent.classList.toggle("active", state.filters.sort === "recent");
}

function renderFilterInputs() {
  el.globalSearch.value = state.filters.query;
  el.depsOnly.checked = state.filters.depsOnly;
  el.containerOnly.checked = state.filters.containerOnly;

  renderKindState();
  renderSortState();
}

function setRefreshLoading(loading) {
  el.refreshData.disabled = loading;
  el.retryLoad.disabled = loading;
  el.refreshData.classList.toggle("spinning", loading);
}

function renderAll() {
  applyI18n();
  renderFilterInputs();
  renderSync();
  renderMetrics();
  renderPackages();
  renderDetail();
  renderWarnings();
}

function setKind(kind) {
  state.filters.kind = kind === "tool" || kind === "flow" ? kind : "all";
  renderKindState();
  renderPackages();
  renderDetail();
}

function setSort(sort) {
  state.filters.sort = sort === "recent" ? "recent" : "name";
  renderSortState();
  renderPackages();
  renderDetail();
}

function setLocale(locale) {
  state.locale = locale === "zh" ? "zh" : "en";
  localStorage.setItem(LOCALE_STORAGE_KEY, state.locale);
  renderAll();
}

function showCopyToast(text) {
  if (state.copyToastTimer) {
    clearTimeout(state.copyToastTimer);
    state.copyToastTimer = null;
  }
  el.copyToast.textContent = text;
  el.copyToast.classList.remove("hidden");
  state.copyToastTimer = setTimeout(() => {
    el.copyToast.classList.add("hidden");
    state.copyToastTimer = null;
  }, 1400);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "readonly");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(input);
  if (!ok) {
    throw new Error("copy failed");
  }
}

async function handleCopy(text) {
  try {
    await copyText(text);
    showCopyToast(t("copy_done"));
  } catch (_) {
    showCopyToast(t("copy_failed"));
  }
}

function scrollToNode(node, focusNode = null) {
  if (!node) return;
  const header = document.querySelector(".app-header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const top = window.scrollY + node.getBoundingClientRect().top - headerHeight - 14;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth"
  });
  if (focusNode) {
    window.setTimeout(() => {
      focusNode.focus({ preventScroll: true });
    }, 260);
  }
}

function bindEvents() {
  el.langEn.addEventListener("click", () => setLocale("en"));
  el.langZh.addEventListener("click", () => setLocale("zh"));

  el.refreshData.addEventListener("click", () => {
    loadData(true);
  });
  el.retryLoad.addEventListener("click", () => {
    loadData(true);
  });

  el.globalSearch.addEventListener("input", (event) => {
    state.filters.query = String(event.target.value || "");
    renderPackages();
    renderDetail();
  });

  el.kindAll.addEventListener("click", () => setKind("all"));
  el.kindTool.addEventListener("click", () => setKind("tool"));
  el.kindFlow.addEventListener("click", () => setKind("flow"));
  el.sortName.addEventListener("click", () => setSort("name"));
  el.sortRecent.addEventListener("click", () => setSort("recent"));

  el.depsOnly.addEventListener("change", (event) => {
    state.filters.depsOnly = Boolean(event.target.checked);
    renderPackages();
    renderDetail();
  });

  el.containerOnly.addEventListener("change", (event) => {
    state.filters.containerOnly = Boolean(event.target.checked);
    renderPackages();
    renderDetail();
  });

  el.quickSearch.addEventListener("click", () => {
    scrollToNode(el.searchSection, el.globalSearch);
  });
  el.quickPackages.addEventListener("click", () => {
    scrollToNode(el.packagesSection);
  });
  el.quickTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  el.copyLatest.addEventListener("click", () => {
    handleCopy(el.installLatest.textContent || "");
  });

  el.copyVersion.addEventListener("click", () => {
    handleCopy(el.installVersion.textContent || "");
  });
  el.copyChain.addEventListener("click", () => {
    handleCopy(el.installChain.textContent || "");
  });
}

async function fetchIndex(forceRefresh = false) {
  const url = forceRefresh
    ? `${INDEX_URL}?t=${Date.now()}`
    : INDEX_URL;
  const response = await fetch(url, {
    cache: forceRefresh ? "reload" : "no-store",
    headers: {
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

async function loadData(manual = false) {
  state.syncState = "syncing";
  state.syncError = "";
  setRefreshLoading(true);
  renderSync();
  try {
    const indexJson = await fetchIndex(manual);
    state.index = normalizeIndex(indexJson);
    state.packages = state.index.packages;
    state.packageMap = state.index.packageMap;
    state.repositories = state.index.repositories;
    state.warnings = state.index.warnings;
    state.syncState = "done";
    state.lastSuccessSyncAt = new Date().toISOString();
    localStorage.setItem(LAST_SUCCESS_SYNC_AT_KEY, state.lastSuccessSyncAt);
    if (state.index.generatedAt) {
      state.lastSuccessGeneratedAt = state.index.generatedAt;
      localStorage.setItem(LAST_SUCCESS_GENERATED_AT_KEY, state.lastSuccessGeneratedAt);
    }
  } catch (error) {
    console.error("[taffish-hub] failed to load index:", error);
    state.syncState = "failed";
    state.syncError = String(error && error.message ? error.message : error);
    if (!state.index) {
      state.index = normalizeIndex({});
      state.packages = [];
      state.packageMap = new Map();
      state.repositories = [];
      state.warnings = [];
    }
  }
  setRefreshLoading(false);
  renderAll();

}

function boot() {
  bindEvents();
  renderAll();
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  loadData(false);
}

boot();
