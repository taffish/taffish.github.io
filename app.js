"use strict";

const INDEX_URL = "https://raw.githubusercontent.com/taffish/taffish-index/main/index/index.json";
const LOCALE_STORAGE_KEY = "taffish_hub_locale";

const I18N = {
  en: {
    nav_index_repo: "Index Repo",
    title: "Package Registry",
    subtitle: "Search apps, inspect versions, and install with deterministic dependencies.",
    metric_packages: "Packages",
    metric_versions: "Versions",
    metric_commands: "Commands",
    metric_repositories: "Repositories",
    search: "Search package, command, repository",
    kind_all: "All",
    kind_tool: "Tool",
    kind_flow: "Flow",
    filter_deps_only: "Dependencies only",
    filter_container_only: "Container image only",
    section_packages: "Packages",
    section_repositories: "Repositories",
    empty_packages: "No package data.",
    empty_repositories: "No repository data.",
    empty_detail: "Select a package to view details.",
    install_commands: "Install Commands",
    detail_versions: "Versions",
    detail_dependencies: "Dependencies",
    detail_platform: "Platform",
    sync_syncing: "Syncing data...",
    sync_done: "Data synced",
    sync_failed: "Sync failed",
    sync_generated: "Index generated",
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
    label_command: "Command",
    label_repository: "Repository",
    label_tag: "Tag",
    label_license: "License",
    label_source_ref: "Source Ref",
    label_source_commit: "Source Commit",
    label_runtime: "Runtime",
    label_main: "Main",
    label_help: "Help",
    label_dockerfile: "Dockerfile",
    label_container_image: "Container Image",
    label_container_tag: "Image Tag",
    label_package_count: "Packages",
    latest_prefix: "latest",
    any: "any",
    none: "none"
  },
  zh: {
    nav_index_repo: "索引仓库",
    title: "软件包索引",
    subtitle: "检索应用、查看版本，并基于确定性依赖完成安装。",
    metric_packages: "软件包",
    metric_versions: "版本数",
    metric_commands: "命令数",
    metric_repositories: "仓库数",
    search: "搜索包名、命令名或仓库",
    kind_all: "全部",
    kind_tool: "工具",
    kind_flow: "流程",
    filter_deps_only: "仅看有依赖",
    filter_container_only: "仅看有镜像",
    section_packages: "软件包",
    section_repositories: "仓库",
    empty_packages: "暂无软件包数据。",
    empty_repositories: "暂无仓库数据。",
    empty_detail: "请选择一个软件包查看详情。",
    install_commands: "安装命令",
    detail_versions: "版本",
    detail_dependencies: "依赖",
    detail_platform: "平台",
    sync_syncing: "正在同步数据...",
    sync_done: "数据同步完成",
    sync_failed: "数据同步失败",
    sync_generated: "索引生成时间",
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
    label_command: "命令",
    label_repository: "仓库",
    label_tag: "标签",
    label_license: "许可证",
    label_source_ref: "源码引用",
    label_source_commit: "源码提交",
    label_runtime: "运行模式",
    label_main: "入口脚本",
    label_help: "帮助文档",
    label_dockerfile: "Dockerfile",
    label_container_image: "容器镜像",
    label_container_tag: "镜像标签",
    label_package_count: "软件包数",
    latest_prefix: "最新",
    any: "任意",
    none: "无"
  }
};

const state = {
  locale: readInitialLocale(),
  syncState: "syncing",
  index: null,
  packages: [],
  packageMap: new Map(),
  repositories: [],
  filters: {
    query: "",
    kind: "all",
    depsOnly: false,
    containerOnly: false
  },
  selectedPackage: null,
  selectedVersion: null
};

const el = {
  langEn: document.getElementById("langEn"),
  langZh: document.getElementById("langZh"),
  syncState: document.getElementById("syncState"),
  syncTime: document.getElementById("syncTime"),
  metricPackages: document.getElementById("metricPackages"),
  metricVersions: document.getElementById("metricVersions"),
  metricCommands: document.getElementById("metricCommands"),
  metricRepositories: document.getElementById("metricRepositories"),
  globalSearch: document.getElementById("globalSearch"),
  kindAll: document.getElementById("kindAll"),
  kindTool: document.getElementById("kindTool"),
  kindFlow: document.getElementById("kindFlow"),
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
  detailMeta: document.getElementById("detailMeta"),
  versionsTable: document.getElementById("versionsTable"),
  dependenciesTable: document.getElementById("dependenciesTable"),
  platformTable: document.getElementById("platformTable"),
  reposEmpty: document.getElementById("reposEmpty"),
  reposGrid: document.getElementById("reposGrid")
};

function readInitialLocale() {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  return saved === "zh" ? "zh" : "en";
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

function buildVersionRecord(versionId, rawRecord, packageEntry) {
  const record = asObject(rawRecord);
  const command = asObject(record.command);
  const runtime = asObject(record.runtime);
  const paths = asObject(record.paths);
  const source = asObject(record.source);
  const container = asObject(record.container);
  const dependencies = parseDependencies(record.dependencies);

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
      imageTag: isNonEmptyString(container.image_tag) ? container.image_tag : ""
    },
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
    ...versions.map((item) => item.versionId)
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

function normalizeIndex(rawIndex) {
  const index = asObject(rawIndex);
  const packagesObject = asObject(index.packages);
  const packageNames = Object.keys(packagesObject).sort();
  const packages = packageNames.map((name) => buildPackageRecord(name, packagesObject[name]));
  const packageMap = new Map(packages.map((pkg) => [pkg.name, pkg]));
  const repositories = buildRepositoryRows(index);
  return {
    generatedAt: isNonEmptyString(index.generated_at) ? index.generated_at : "",
    counts: asObject(index.counts),
    packages,
    packageMap,
    repositories
  };
}

function getFilteredPackages() {
  const { query, kind, depsOnly, containerOnly } = state.filters;
  const keyword = query.trim().toLowerCase();
  return state.packages.filter((pkg) => {
    if (kind !== "all" && pkg.kind !== kind) return false;
    if (depsOnly && pkg.dependencyCount <= 0) return false;
    if (containerOnly && !pkg.hasContainerImage) return false;
    if (!keyword) return true;
    return pkg.searchText.includes(keyword);
  });
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

function createHeaderRow(labels, extraClass = "") {
  const row = document.createElement("div");
  row.className = `table-row header ${extraClass}`.trim();
  for (const label of labels) {
    row.append(createCell(label));
  }
  return row;
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
  el.syncState.textContent = t(
    state.syncState === "failed"
      ? "sync_failed"
      : (state.syncState === "done" ? "sync_done" : "sync_syncing")
  );
  const generated = state.index ? state.index.generatedAt : "";
  el.syncTime.textContent = `${t("sync_generated")}: ${formatLocalDateTime(generated)}`;
}

function renderMetrics() {
  const counts = state.index ? state.index.counts : {};
  const packageCount = state.packages.length || Number(counts.packages) || 0;
  const versionCount = Number(counts.versions) || state.packages.reduce((sum, pkg) => sum + pkg.versions.length, 0);
  const commandCount = Number(counts.commands) || state.packages.filter((pkg) => isNonEmptyString(pkg.commandName)).length;
  const repoCount = state.repositories.length || Number(counts.repositories) || 0;

  el.metricPackages.textContent = formatCount(packageCount);
  el.metricVersions.textContent = formatCount(versionCount);
  el.metricCommands.textContent = formatCount(commandCount);
  el.metricRepositories.textContent = formatCount(repoCount);
}

function renderPackages() {
  const filtered = getFilteredPackages();
  ensureSelection(filtered);

  el.resultCount.textContent = `${formatCount(filtered.length)} ${t("result_count")}`;
  el.packagesTable.textContent = "";

  if (filtered.length === 0) {
    el.packagesEmpty.classList.remove("hidden");
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
    if (pkg.name === state.selectedPackage) {
      row.classList.add("active");
    }

    const repositoryLabel = isNonEmptyString(pkg.repositorySlug)
      ? pkg.repositorySlug
      : (isNonEmptyString(pkg.repositoryUrl) ? pkg.repositoryUrl : "-");
    const kindLabel = pkg.kind === "flow" ? t("kind_flow") : t("kind_tool");

    row.append(
      createCell(pkg.name),
      createCell(pkg.latest || "-", "cell-mono"),
      createCell(kindLabel, "cell-kind"),
      createCell(pkg.commandName || "-", "cell-mono"),
      createCell(String(pkg.dependencyCount), "cell-center"),
      createCell(repositoryLabel, "cell-mono")
    );

    row.addEventListener("click", () => {
      state.selectedPackage = pkg.name;
      state.selectedVersion = pkg.latest;
      renderPackages();
      renderDetail();
    });

    el.packagesTable.append(row);
  }
}

function appendKv(key, value) {
  el.detailMeta.append(createCell(key, "kv-key"));
  if (value instanceof Node) {
    const valueWrapper = document.createElement("div");
    valueWrapper.className = "kv-value";
    valueWrapper.append(value);
    el.detailMeta.append(valueWrapper);
    return;
  }
  el.detailMeta.append(createCell(value || "-", "kv-value"));
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
    });
    el.versionsTable.append(row);
  }
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

function renderPlatformTable(version) {
  el.platformTable.textContent = "";
  const header = document.createElement("div");
  header.className = "mini-row header";
  header.append(createCell(t("table_key")), createCell(t("table_value")));
  el.platformTable.append(header);

  const platform = version.platform;
  const osValue = platform.os.length ? platform.os.join(", ") : t("any");
  const archValue = platform.arch.length ? platform.arch.join(", ") : t("any");
  const containerValue = platform.container || "optional";
  const minCpuValue = platform.minCpus == null ? t("none") : String(platform.minCpus);
  const minMemoryValue = platform.minMemoryMb == null ? t("none") : String(platform.minMemoryMb);

  el.platformTable.append(createMiniRow(["os", osValue], ["cell-mono", "cell-mono"]));
  el.platformTable.append(createMiniRow(["arch", archValue], ["cell-mono", "cell-mono"]));
  el.platformTable.append(createMiniRow(["container", containerValue], ["cell-mono", "cell-mono"]));
  el.platformTable.append(createMiniRow(["min_cpus", minCpuValue], ["cell-mono", "cell-mono"]));
  el.platformTable.append(createMiniRow(["min_memory_mb", minMemoryValue], ["cell-mono", "cell-mono"]));
}

function renderDetail() {
  const pkg = state.packageMap.get(state.selectedPackage || "");
  if (!pkg) {
    el.detailEmpty.classList.remove("hidden");
    el.detailPane.classList.add("hidden");
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
    return;
  }

  el.detailEmpty.classList.add("hidden");
  el.detailPane.classList.remove("hidden");
  el.detailName.textContent = pkg.name;
  el.detailKind.textContent = version.kind === "flow" ? t("kind_flow") : t("kind_tool");
  el.detailLatest.textContent = `${t("latest_prefix")}: ${pkg.latest || "-"}`;

  el.installLatest.textContent = `taf install ${pkg.name}`;
  el.installVersion.textContent = `taf install ${pkg.name} --version ${version.versionId}`;

  el.detailMeta.textContent = "";
  appendKv(t("label_command"), version.commandName || "-");
  if (isNonEmptyString(version.repositoryUrl)) {
    appendKv(
      t("label_repository"),
      buildLinkNode(version.repositorySlug || version.repositoryUrl, version.repositoryUrl)
    );
  } else {
    appendKv(t("label_repository"), "-");
  }
  appendKv(t("label_tag"), version.tag || "-");
  appendKv(t("label_license"), version.license || "-");
  appendKv(t("label_source_ref"), version.source.ref || "-");
  appendKv(t("label_source_commit"), version.source.commit || "-");
  appendKv(t("label_runtime"), formatRuntime(version.runtime));
  appendKv(t("label_main"), version.paths.main || "-");
  appendKv(t("label_help"), version.paths.help || "-");
  appendKv(t("label_dockerfile"), version.paths.dockerfile || "-");
  appendKv(t("label_container_image"), version.container.image || "-");
  appendKv(t("label_container_tag"), version.container.imageTag || "-");

  renderVersionsTable(pkg);
  renderDependenciesTable(version);
  renderPlatformTable(version);
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
  el.kindTool.textContent = t("kind_tool");
  el.kindFlow.textContent = t("kind_flow");
  el.langEn.classList.toggle("active", state.locale === "en");
  el.langZh.classList.toggle("active", state.locale === "zh");
  el.langEn.setAttribute("aria-pressed", state.locale === "en" ? "true" : "false");
  el.langZh.setAttribute("aria-pressed", state.locale === "zh" ? "true" : "false");
}

function renderAll() {
  applyI18n();
  renderSync();
  renderMetrics();
  renderPackages();
  renderDetail();
  renderRepositories();
}

function setKind(kind) {
  state.filters.kind = kind === "tool" || kind === "flow" ? kind : "all";
  el.kindAll.classList.toggle("active", state.filters.kind === "all");
  el.kindTool.classList.toggle("active", state.filters.kind === "tool");
  el.kindFlow.classList.toggle("active", state.filters.kind === "flow");
  renderPackages();
  renderDetail();
}

function setLocale(locale) {
  state.locale = locale === "zh" ? "zh" : "en";
  localStorage.setItem(LOCALE_STORAGE_KEY, state.locale);
  renderAll();
}

function bindEvents() {
  el.langEn.addEventListener("click", () => setLocale("en"));
  el.langZh.addEventListener("click", () => setLocale("zh"));

  el.globalSearch.addEventListener("input", (event) => {
    state.filters.query = String(event.target.value || "");
    renderPackages();
    renderDetail();
    renderRepositories();
  });

  el.kindAll.addEventListener("click", () => setKind("all"));
  el.kindTool.addEventListener("click", () => setKind("tool"));
  el.kindFlow.addEventListener("click", () => setKind("flow"));

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
}

async function fetchIndex() {
  const response = await fetch(INDEX_URL, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

async function loadData() {
  state.syncState = "syncing";
  renderSync();
  try {
    const indexJson = await fetchIndex();
    state.index = normalizeIndex(indexJson);
    state.packages = state.index.packages;
    state.packageMap = state.index.packageMap;
    state.repositories = state.index.repositories;
    state.syncState = "done";
  } catch (error) {
    console.error("[taffish-hub] failed to load index:", error);
    state.index = normalizeIndex({});
    state.packages = [];
    state.packageMap = new Map();
    state.repositories = [];
    state.syncState = "failed";
  }
  renderAll();
}

function boot() {
  bindEvents();
  setKind(state.filters.kind);
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
  renderAll();
  loadData();
}

boot();
